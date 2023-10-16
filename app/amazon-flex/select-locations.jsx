import { useState, useEffect } from "react";
import { useContextoApp } from "../contexto-app";
import { Button, ToggleSwitch, TextInput, Toast } from "flowbite-react";
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
        const module = await import("./ubicaciones.json");
        const jsonLocations = module.default;
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
    mensaje("ok", "Ubicaciones almacenadas correctamente");
    setAfActiveTab(0);
  };

  return (
    <main className="flex flex-col min-h-screen max-h-screen items-center justify-start p-0  md:p-20">
      <span className="font-medium text-gray-800 dark:text-white">
        Seleccione las ubicaciones en las que quiere recibir bloques
      </span>
      <Button
        className="w-full"
        type="submit"
        onClick={() => handleSaveLocations()}
      >
        Guardar
      </Button>

      <br />
      <TextInput
        className="w-full"
        type="text"
        onChange={(e) => handleSearchLocation(e.target.value)}
        placeholder="Buscar ubicacion"
      />
      <table>
        <tr>
          <th>Ubicacion</th>
        </tr>
        {filteredLocations.map((l) => (
          <tr key={l.value}>
            <td>
              <ToggleSwitch
                checked={selectedLocations.find((w) => w.value === l.value)}
                label={l.nombre}
                value={l.value}
                onChange={() => handleToggleSwitchChange(l.value)}
              />
            </td>
          </tr>
        ))}
      </table>
      <Button
        className="w-full"
        type="button"
        onClick={() => handleSaveLocations()}
      >
        Guardar
      </Button>
    </main>
  );
}
