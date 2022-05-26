import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text
} from '@chakra-ui/react'

const PopupComponent = ({isOpen, onClose, name, diameter, climate, population}) => {
  return(
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Planet Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize='lg'>Name: {name}</Text>
          <Text fontSize='lg'>Diameter: {diameter}</Text>
          <Text fontSize='lg'>Climate: {climate}</Text>
          <Text fontSize='lg'>Population: {population}</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PopupComponent;