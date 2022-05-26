import React, { useEffect, useState } from "react";
import {
  Tr,
  Td,
  useDisclosure,
  Link
} from '@chakra-ui/react';
import PopupComponent from "../Popup";

const fetchPlanet = async (apiUrl) => {
  let response = await fetch(apiUrl);
  return await response.json();
}

const TrComponent = ({ row }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [planet, setPlanet] = useState({});
  const [, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState ({}), []);

  useEffect(() => {
    fetchPlanet(row.original.homeworld).then((result) => {
      setPlanet(result);
    });
  }, [row]);

  useEffect(() => {
    if(planet.name) {
      row.values.planetName = planet.name;
      row.values.diameter = planet.diameter;
      row.values.climate = planet.climate;
      row.values.population = planet.population;
      row.cells[5].value = planet.name;
      row.allCells[5].value = planet.name;
      forceUpdate();
    }
  }, [planet, row, forceUpdate]);

  return(
    <Tr {...row.getRowProps()}>
      {row.cells.map((cell, index) => (
        <Td {...cell.getCellProps()}>
          {index === 5 ? cell.render(
            <>
              <Link onClick={onOpen}>{cell.value}</Link>
              <PopupComponent
                isOpen={isOpen}
                onClose={onClose}
                name={cell.value}
                diameter={row.values.diameter}
                climate={row.values.climate}
                population={row.values.population}
              />
            </>
          ) : cell.render('Cell')}
        </Td>
      ))}
    </Tr>
  );
}

export default TrComponent;