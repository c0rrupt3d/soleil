import * as React from "react";
import useMediaQuery from "@/utils/useMediaQuery";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  //   DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  //   DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { useSettingsStore } from "@/store/settingsStore";
import { useShallow } from "zustand/react/shallow";
import { useThemeStore } from "@/store/themeStore";
import { Separator } from "@/components/ui/separator";

export default function SettingsDialog() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings className="size-[1rem]" />
            <span className="sr-only">App settings</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[27rem]">
          <DialogHeader>
            <DialogTitle className="flex space-x-2 items-center"> <Settings/> <span>Settings</span></DialogTitle>
          </DialogHeader>
          <Content />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer shouldScaleBackground open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="size-[1rem]" />
          <span className="sr-only">App settings</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex space-x-2 items-center"><Settings/>  <span>Settings</span></DrawerTitle>
        </DrawerHeader>
        <Content className="px-4" />
        <DrawerFooter className="pt-2 mt-8">
          <DrawerClose className="flex w-full">
            <Button className="w-full" variant={"outline"}>
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function Content({ className }: React.ComponentProps<"div">) {
  const { theme, setTheme } = useThemeStore(
    useShallow((state) => ({
      theme: state.theme,
      setTheme: state.setTheme,
    }))
  );

  const {
    tempUnit,
    setTempUnit,
    windUnit,
    setWindUnit,
    // precipUnit,
    // setPrecipUnit,
    time12,
    setTime12,
    elevationUnit,
    setElevationUnit,
  } = useSettingsStore(
    useShallow((state) => ({
      tempUnit: state.tempUnit,
      setTempUnit: state.setTempUnit,
      windUnit: state.windUnit,
      setWindUnit: state.setWindUnit,
      // precipUnit: state.precipUnit,
      // setPrecipUnit: state.setPrecipUnit,
      time12: state.time12,
      setTime12: state.setTime12,
      setElevationUnit: state.setElevationUnit,
      elevationUnit: state.elevationUnit
    }))
  );

  const toggleableSettings: ToggleableSettingsProps[] = [
    {
      heading: "App",
      settings: [
        {
          name: "Theme",
          options: [
            { key: "light", label: "Light" },
            { key: "dark", label: "Dark" },
            { key: "system", label: "System" },
          ],
          selected: theme,
          setSelected: setTheme,
          sr: "Toggle theme",
        },
        {
          name: "Time Format",
          options: [
            {key: "1", label: "12 Hour"},
            {key: "0", label: "24 Hour"},
          ],
          selected: time12,
          setSelected: setTime12,
          sr: "Time Format"
        }
      ],
    },
    {
      heading: "Units",
      settings: [
        {
          name: "Temperature",
          options: [
            { key: "cel", label: "Celsius" },
            { key: "fah", label: "Fahrenheit" },
          ],
          selected: tempUnit,
          setSelected: setTempUnit,
          sr: "Toggle temperature unit",
        },
        {
          name: "Wind speed",
          options: [
            { key: "kmh", label: "km/h" },
            { key: "ms", label: "m/s" },
            { key: "mph", label: "mph" },
            { key: "kn", label: "knots" },
          ],
          selected: windUnit,
          setSelected: setWindUnit,
          sr: "Toggle wind unit",
        },
        {
          name: "Elevation",
          options : [
            {key: "m", label: "Meters"},
            {key: "ft", label: "Feet"},
          ],
          selected: elevationUnit,
          setSelected: setElevationUnit,
          sr: "Toggle elevation unit"
        }
        // {
        //   name: "Precipitation",
        //   options: [
        //     { key: "mm", label: "Millimeters" },
        //     { key: "in", label: "Inches" },
        //   ],
        //   selected: precipUnit,
        //   setSelected: setPrecipUnit,
        //   sr: "Toggle precipitation unit",
        // },
      ],
    },
  ];

  return (
    <div className={cn("flex flex-col mt-2 space-y-8", className)}>
    <Separator />
      {toggleableSettings.map((cat, index) => {
        return (
          <div className="flex flex-col space-y-4" >
            <div className="text-md font-semibold bg-secondary rounded-md px-2 py-1 w-fit" >{cat.heading}</div>
            {cat.settings.map((item) => {
              return (
                <SettingItem name={item.name}>
                  <>
                    <ToggleSetting
                      options={item.options}
                      selected={item.selected}
                      onChange={item.setSelected}
                      sr={item.sr}
                    />
                  </>
                </SettingItem>
              );
            })}
            {index !== toggleableSettings.length - 1 && (
              <Separator />
            )}
          </div>
        );
      })}
    </div>
  );
}

const ToggleSetting: React.FC<DropdownSettingsProps> = ({
  options,
  selected,
  onChange,
  sr,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="space-x-1">
          <span>{options.find((opt) => opt.key === selected)?.label}</span>
          <span className="sr-only">{sr}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.key}
            checked={option.key === selected}
            onClick={() => onChange(option.key)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const SettingItem: React.FC<{ name: string; children: React.ReactNode }> = ({
    name,
    children,
  }) => {
    return (
      <div className="flex justify-between w-full items-center">
        <span className="max-w-3/4">{name}</span>
        {children}
      </div>
    );
  };