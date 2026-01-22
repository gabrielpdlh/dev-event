import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({
  image,
  title,
  date,
  location,
  slug,
  time,
}: EventCardProps) => {
  return (
    <Link href={`/events/${slug}`}>
      <Image
        src={image}
        alt={title}
        height={300}
        width={410}
        className="poster rounded-2xl"
      />
      <div className="flex flex-row gap-2">
        <Image src="/icons/pin.svg" alt="Pin map icon" width={14} height={14} />
        <p>{location}</p>
      </div>
      <p className="text-[20px] font-semibold line-clamp-1">{title}</p>
      <div className="text-light-200 flex flex-row flex-wrap items-center gap-4">
        <div className="flex flex-row gap-2">
          <Image
            src="/icons/calendar.svg"
            alt="Pin map icon"
            width={14}
            height={14}
          />
          <p>{date}</p>
        </div>
        <div className="flex flex-row gap-2">
          <Image
            src="/icons/clock.svg"
            alt="Pin map icon"
            width={14}
            height={14}
          />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
