import { useState, useEffect } from "react";
import { useContextoApp } from "../contexto-app";
import { Button, ToggleSwitch, TextInput } from "flowbite-react";
import mensaje from "../components/shared/message-ok";
export default function SelectLocations() {
  const { dict, toggleSidebarOpen, setAfActiveTab } = useContextoApp();
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  useEffect(() => {
    toggleSidebarOpen(0);

    const fetchLocations = async () => {
      try {
        const modulex = await import("./ubicaciones.json");
        const jsonLocations = modulex.default;
        // console.log(jsonLocations.locations);
        setLocations(jsonLocations.locations);
        setFilteredLocations(jsonLocations.locations);
      } catch (error) {
        setLocations([]);
        setFilteredLocations([]);
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleToggleSwitchChange = (value) => {
    // Buscar el objeto de ubicación correspondiente al valor
    const locationToAdd = locations.find(
      (location) => location.value === value
    );

    // Verificar si la ubicación ya está en selectedLocations
    const isSelected = selectedLocations.some(
      (location) => location.value === value
    );

    // Si ya está seleccionada, quitarla; de lo contrario, agregarla
    setSelectedLocations((prevSelected) =>
      isSelected
        ? prevSelected.filter((l) => l.value !== value)
        : [...prevSelected, locationToAdd]
    );
  };

  const handleSearchLocation = (searchText) => {
    if (!searchText || searchText === "") {
      setFilteredLocations(locations);
    } else {
      const filtered = locations.filter((item) =>
        item.nombre
          .toLowerCase()
          .trim()
          .includes(searchText.toLowerCase().trim())
      );
      const combinedLocations = Array.from(
        new Set([...filtered, ...selectedLocations])
      );
      setFilteredLocations(combinedLocations);
    }
  };

  const handleSaveLocations = () => {
    // console.log(selectedLocations);
    mensaje("ok", dict.locations.savedok);
    setAfActiveTab(0);
  };
  const truncateString = (str) => {
    const maxLength = 40;
    // console.log(str.length, maxLength, str);
    if (str.length <= maxLength) {
      return str;
    } else {
      const r = str.slice(0, maxLength - 3) + "...";
      return r;
    }
  };

  return (
    <main className="flex flex-col min-h-screen max-h-screen items-center justify-start p-0  md:p-20">
      <span className="font-medium text-gray-800 dark:text-white">
        {dict.locations.texttouser}
      </span>
      <br />
      <Button
        className="w-full"
        type="submit"
        onClick={() => handleSaveLocations()}
      >
        {dict.locations.save}
      </Button>

      <br />
      <TextInput
        className="w-full"
        type="text"
        onChange={(e) => handleSearchLocation(e.target.value)}
        placeholder={dict.locations.search}
      />
      <table>
        <tr>
          <th>Ubicacion</th>
        </tr>
        {filteredLocations.map((l) => (
          <tr key={l.value}>
            <td className="h-auto">
              <ToggleSwitch
                className="h-auto"
                checked={selectedLocations.find((w) => w.value === l.value)}
                label={truncateString(l.nombre)}
                value={l.value}
                onChange={() => handleToggleSwitchChange(l.value)}
              />
            </td>
          </tr>
        ))}
      </table>
      <br />
      <Button
        className="w-full mb-20"
        type="button"
        onClick={() => handleSaveLocations()}
      >
        {dict.locations.save}
      </Button>
      <br />
    </main>
  );
}
