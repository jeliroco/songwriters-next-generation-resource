import Button from "./Button";
import Card from "./Card";

interface FeatureCardProps {
  title?: string;
  description?: string;
  paragraph?: string;
  imageUrl?: string;
  linkText?: string;
  linkUrl?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title = "Title",
  description = "Description",
  paragraph = "Paragraph",
  imageUrl = "./assets/melody.webp",
  linkText = "Go!",
  linkUrl,
}) => {
  return (
    <Card
      front={
        <div
          className="relative flex flex-col items-center bg-center bg-no-repeat bg-cover border-2 border-blue-300 rounded-lg aspect-square sm:aspect-video md:aspect-square 2xl:aspect-video justify-stretch"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="z-10 flex items-center justify-center flex-1">
            <h3
              style={{ textShadow: "1px 1px 1px black" }}
              className="py-2 font-black text-center text-orange-300 text-md md:text-lg lg:text-xl xl:text-2xl"
            >
              {title}
            </h3>
          </div>
          <p className="z-10 p-2 m-2 text-sm rounded-lg sm:text-base md:text-lg bg-blue-100/70">
            {description}
          </p>
          <div className="absolute inset-0 w-full h-full rounded-md bg-blue-300/30"></div>
        </div>
      }
      back={
        <div className="flex flex-col items-stretch p-4 overflow-y-auto bg-blue-200 bg-center bg-no-repeat bg-cover border-2 border-blue-300 rounded-lg aspect-square sm:aspect-video md:aspect-square 2xl:aspect-video justify-stretch">
          <p className="flex-1 mb-2 text-xs sm:text-sm lg:text-base" >{paragraph}</p>
          <div className="flex items-end justify-end">
            {linkUrl && (
              <a href={linkUrl}>
                <Button>
                  {linkText}
                  <i className="ml-2 bi bi-arrow-right-circle-fill" />
                </Button>
              </a>
            )}
=          </div>
        </div>
      }
    />
  );
};

export default FeatureCard;
