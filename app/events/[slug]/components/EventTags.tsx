export const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((item) => (
      <div className="pill" key={item}>
        {item}
      </div>
    ))}
  </div>
);