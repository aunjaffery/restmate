import { BsRocketTakeoff } from "react-icons/bs";
const BeforeResponse = () => {
  return (
    <div className="grid h-full w-full" style={{ gridTemplateRows: "min-content minmax(0, 100%)", gridTemplateColumns: "minmax(0px, 100%)" }}>
      <div className="h-full w-full">
        <p className="text-txtprim font-bold text-sm">Response</p>
      </div>
      <div className="pt-2 h-full">
        <div className="h-full flex flex-col justify-center items-center gap-y-5 text-txtsec pb-10">
          <div className="">
            <BsRocketTakeoff size="80" />
          </div>
          <p className="text-sm text-txtsec">Enter the URL and click Send to get a response</p>
        </div>
      </div>
    </div>
  );
};

export default BeforeResponse;
