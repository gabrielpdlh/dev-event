import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import events from "@/lib/constants/events";

export default function Home() {
  return (
    <section>
      <h1 className="text-center">
        The Hub For Every Dev <br /> Event You Can&apos;t Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups and Conferences, All in One Place
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7 ">
        <h3>Featured Events</h3>
        <div className="grid md:grid-cols-3 gap-10 sm:grid-cols-2 grid-cols-1">
          {events.map((event) => (
            <EventCard key={event.slug} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}
