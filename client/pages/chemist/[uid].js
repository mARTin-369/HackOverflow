import {
  Flex,
  Table,
  Thead,
  Tbody,
  Link,
  Tr,
  Th,
  Td,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const cdashboard = () => {
  const router = useRouter();
  const { uid } = router.query;

  const [paadhaar, setPaadhaar] = useState({ patient: "" });
  const [isLoaded, setIsLoaded] = useState(false);
  const [meds, setMeds] = useState([]);

  const handleKey = async (e) => {
    if (e.code == "Enter") {
      try {
        const response = await fetch("url_to_server/api/prescription", {
          method: "POST",
          body: JSON.stringify(paadhaar),
          headers: {
            Authorization: "Bearer " + uid,
            Accept: "application/json",
            "Content-type": "application/json",
          },
        });
        const data = await response.json();
        if (data.uid == paadhaar.patient) {
          setMeds(data.prescriptions);
          setIsLoaded(true);
        } else {
          alert("No active prescriptions.");
        }
      } catch (error) {
        alert("Failed to fetch data.");
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setPaadhaar({ patient: e.target.value });
  };

  return (
    <Flex h="100vh" w="100%" flexDir="column">
      <Input
        w={["50%", "40%", "40%"]}
        my={8}
        onKeyDown={handleKey}
        placeholder="Patient Aadhaar"
        value={paadhaar.patient}
        onChange={handleChange}
        mx={8}
      />
      {isLoaded ? (
        <>
          <Table p={2} alignSelf="center">
            <Thead>
              <Tr>
                <Th>Prescription ID</Th>
                <Th>Date</Th>
                <Th>Doctor ID</Th>
              </Tr>
            </Thead>
            <Tbody>
              {meds.map((med) => {
                return (
                  <Tr key={med._id}>
                    <Td>
                      <Link isExternal href={`/medicine/${med._id}`}>
                        {med._id}
                      </Link>
                    </Td>
                    <Td>{med.date}</Td>
                    <Td>{med.doctor.lid}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </>
      ) : null}
    </Flex>
  );
};

export default cdashboard;
