import SettingsDialog from "@/components/setttingsDialog";
import SearchLocation from "@/components/searchLocation";

function Header() {
  return (
    <div className="sticky h-16 top-0 flex z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container justify-between inline-flex h-16 max-w-screen-xl w-full items-center space-x-2">
        <div className="h-8 w-8 md:w-full inline-flex  md:space-x-2 items-center">
          <img className="h-8 min-w-8 aspect-square" src="/soleil.png" />
          <span className="text-xl font-medium hidden sm:inline-flex">
            Soleil
          </span>
        </div>
        <div className="h-10 w-full inline-flex space-x-2 md:space-x-4 items-center justify-end ">
          <SearchLocation />
          <SettingsDialog />
        </div>
      </div>
    </div>
  );
}

export default Header;
