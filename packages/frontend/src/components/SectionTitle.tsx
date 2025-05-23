export const SectionTitle = (props: { text: string }) => {
  return (
    <div className="border-b border-base-300 pb-5">
      <h2 className="text-3xl font-medium tracking-wider capitalize">{props.text}</h2>
    </div>
  );
};
