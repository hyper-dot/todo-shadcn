export function TypographyH1({
  text,
  className,
}: {
  text: any;
  className: string;
}) {
  return (
    <h1
      className={
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" +
        " " +
        className
      }
    >
      {text}
    </h1>
  );
}

export function TypographyH2({
  text,
  className,
}: {
  text: any;
  className: string;
}) {
  return (
    <h2
      className={
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0" +
        " " +
        `${className}`
      }
    >
      {text}
    </h2>
  );
}
