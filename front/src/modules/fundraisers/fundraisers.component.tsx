import { useReadFundraisers } from "./hooks/use-read-fundraisers.hook";

export const Fundraisers: React.FC = () => {
  const { fundraisers } = useReadFundraisers()
  return <div>{fundraisers.toString()}</div>;
};
