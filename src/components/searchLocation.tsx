import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LoaderCircle, MapPin, Search } from "lucide-react";
import IconLoader from "@/components/iconLoader";
import { fetchLocations, fetchReverseGeo } from "@/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { useWeatherStore } from "@/store/weatherStore";
import { useShallow } from "zustand/react/shallow";

let newAbortController: AbortController | undefined;

function SearchLocation() {
  const { setWeatherLoc, setWeatherCoords } = useWeatherStore(
    useShallow((state) => ({
      setWeatherLoc: state.setWeatherLoc,
      setWeatherCoords: state.setWeatherCoords,
    }))
  );

  const { toast } = useToast();

  const [open, setOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [results, setResults] = useState<GeocodeSearch[]>([]);
  const [geoLoading, setGeoLoading] = useState<boolean>(false);

  const handleLocation = (
    res: GeocodeSearch | Pick<GeocodeSearch, "latitude" | "longitude" | "name" | "country_code">
  ) => {
    setWeatherCoords({
      lat: res.latitude,
      lon: res.longitude,
    });
    setWeatherLoc({
      name: res.name,
      country_code: res.country_code
    });
    setOpen(false);
  };

  const requestReverseGeo = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setGeoLoading(true);
          try {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const result: ReverseGeoProps = await fetchReverseGeo({
              lat: latitude,
              lon: longitude,
            });
            setWeatherCoords({
              lat: latitude,
              lon: longitude,
            });
            const lab =
              result.features[0].properties.geocoding.label.split(",");
            setWeatherLoc({
              name: lab[0].trim(),
              country_code: result.features[0].properties.geocoding.country_code
            });
            setOpen(false);
          } catch (err) {
            console.error(err);
          } finally {
            setGeoLoading(false);
          }
        },
        (geoError) => {
          setGeoLoading(false);
          {
            switch (geoError.code) {
              case geoError.PERMISSION_DENIED:
                toast({
                  title: "Uh oh! Permission denied.",
                  description:
                    "Location access was denied. Using default location - New Delhi.",
                    variant: "destructive"
                });
                handleLocation({
                  latitude: 28.5275544,
                  longitude: 77.0441755,
                  name: "New Delhi",
                  country_code: "IN"
                });

                break;
              case geoError.POSITION_UNAVAILABLE:
                toast({
                  title: "Mission location information",
                  description:
                    "Location information is unavailable. Try again later or enter seach for a location",
                });

                break;
              case geoError.TIMEOUT:
                toast({
                  title: "Timed out",
                  description: "Location request timed out. Try again later.",
                });

                break;
              default:
                toast({
                  title: "Error",
                  description:
                    "Unknown error occurred. Please search for a location.",
                });

                break;
            }
          }
        }
      );
    }
  };

  const requestSearchLocations = async (input: string) => {
    newAbortController?.abort();
    const controller = new AbortController();
    newAbortController = controller;

    try {
      const result = await fetchLocations({
        name: input,
        signal: controller.signal,
      });
      setResults(result.results);
      console.log(result.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (open) {
      requestSearchLocations(searchInput);
    }
  }, [searchInput]);

  //   useEffect(() => {
  //     const down = (e: KeyboardEvent) => {
  //       if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
  //         e.preventDefault()
  //         setOpen((open) => !open)
  //       }
  //     }

  //     document.addEventListener("keydown", down)
  //     return () => document.removeEventListener("keydown", down)
  //   }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex w-full max-w-sm items-center relative">
          <Input
            className="bg-secondary text-md"
            placeholder={"Search location..."}
          />
          {/* <kbd className=" hidden md:flex rounded-md bg-primary/50 mr-2 absolute text-sm right-0 py-1 px-2 items-center space-x-1" ><Command className="size-3.5" /><span>J</span></kbd> */}
        </div>
      </DialogTrigger>
      <DialogContent className=" overflow-y-hidden rounded-md flex flex-col h-4/5 max-h-4/5 sm:h-3/4 sm:max-h-3/4 min-h-72 sm:max-w-[27rem]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Search /> <span>Search location</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full h-full space-y-2">
          <div className="flex space-x-2 w-full">
            <Input
              className="text-md"
              placeholder={"e.g- london, new delhi"}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              disabled={geoLoading}
            />
            {/* <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon">
                    <MapPin />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  Use current location
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> */}
          </div>
          <ScrollArea className="rounded-md h-[88%]">
            <div>
              {results?.length > 0 ? (
                results.map((res) => {
                  return (
                    <Button
                      className="w-full flex h-14 space-x-2 justify-start px-2"
                      variant="ghost"
                      onClick={() => handleLocation(res)}
                    >
                      <div className="h-3/4 aspect-square">
                        <IconLoader
                          type="flag"
                          code={`${res.country_code.toLowerCase()}`}
                        />
                      </div>

                      <div className="flex flex-col h-full truncate items-start justify-center">
                        <div className="text-lg font-medium">{res.name}</div>
                        <div className="text-xs font-light flex">
                          {res.country}
                        </div>
                      </div>
                    </Button>
                  );
                })
              ) : (
                <Button
                  className="w-full flex h-14 space-x-2 justify-start px-2"
                  variant="link"
                  onClick={() => requestReverseGeo()}
                  disabled={geoLoading}
                >
                  {geoLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <MapPin />
                  )}
                  <div className="flex flex-col h-full truncate items-start justify-center">
                    <div className="text-md font-semibold">
                      {geoLoading ? "Fetching..." : "Use current location"}
                    </div>
                  </div>
                </Button>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchLocation;
