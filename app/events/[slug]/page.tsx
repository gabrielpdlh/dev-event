import Image from "next/image";
import { notFound } from "next/navigation";
import { EventDetailItem } from "./components/EventDetailItem";
import { EventAgenda } from "./components/EventAgenda";
import { EventTags } from "./components/EventTags";

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

          <EventAgenda agendaItems={JSON.parse(event.agenda[0])} />
          <EventTags tags={JSON.parse(event.tags[0])} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{event.organizer}</p>
          </section>
        </div>
        <aside className="booking">
          <p className="text-lg font-semibold">Book Event</p>
        </aside>
      </div>
    </section>
  );
};

export default EventDetailsPage;
