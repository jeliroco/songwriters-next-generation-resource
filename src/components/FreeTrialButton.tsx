import Button from "./Button";

interface FreeTrialButtonProps {}

const FreeTrialButton: React.FC<FreeTrialButtonProps> = ({}) => {
  return (
    <a href="/lyrics">
      <Button>
        Try SNGR For Free
        <i className="ml-2 bi bi-arrow-right-circle-fill" />
      </Button>
    </a>
  );
};

export default FreeTrialButton;
