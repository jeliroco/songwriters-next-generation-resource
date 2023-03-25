interface TestimonialProps {
  name?: string;
  description?: string;
  quote?: string;
  imageUrl?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  name = "Name",
  description = "Description",
  quote = "Quote",
  imageUrl = "./assets/melody.webp",
}) => {
  return (
    <div className="flex flex-col">
      <div className="relative h-48 w-48 m-auto mt-0 -mb-8 z-10">
        <img
          src={imageUrl}
          alt={name}
          className="aspect-square rounded-md border-2 border-blue-300"
        />
      </div>
      <div className="relative flex-1 bg-blue-200 border-2 border-blue-300 rounded-lg justify-stretch flex gap-2 p-2 pt-7">
        <div className="flex-[3]">
          <div className="font-bold text-center text-sm md:text-lg">
            {name} - {description}
          </div>
          <div className="text-xs md:text-base">{quote}</div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
