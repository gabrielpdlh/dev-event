import Image from "next/image";
import { notFound } from "next/navigation";
import { EventDetailItem } from "./components/EventDetailItem";
import { EventAgenda } from "./components/EventAgenda";
import { EventTags } from "./components/EventTags";
import BookEvent from "@/components/BookEvent";
import { IEvent } from "@/database";
import { getSimilarEventsBySlug } from "@/app/actions/event-actions";
import EventCard from "@/components/EventCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);

  type Event = {
    event: {
      _id: string;
      audience: string;
      title: string;
      time: string;
      description: string;
      overview: string;
      image: string;
      venue: string;
      location: string;
      date: string;
      mode: string;
      agenda: string[];
      organizer: string;
      tags: string[];
      createdAt: string;
      updatedAt: string;
      slug: string;
    };
  };

  const { event } = (await request.json()) as Event;
  if (!event) return notFound();

  const bookings = 10;

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p className="">{event.description}</p>
      </div>
      <div className="details">
        <div className="content">
          <Image
            src={event.image}
            alt={event.description}
            width={800}
            height={800}
            className="rounded-2xl"
          />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{event.overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={event.date}
            />
            <EventDetailItem
              icon="/icons/clock.svg"
              alt="clock"
              label={event.time}
            />
            <EventDetailItem
              icon="/icons/pin.svg"
              alt="pin"
              label={event.mode}
            />
            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={event.audience}
            />
          </section>

          <EventAgenda agendaItems={event.agenda} />
          <EventTags tags={event.tags} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{event.organizer}</p>
          </section>
        </div>
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}
            <BookEvent eventId={event._id} slug={event.slug} />
          </div>
        </aside>
      </div>
      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent: IEvent) => (
              <EventCard key={similarEvent.title} {...similarEvent} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
