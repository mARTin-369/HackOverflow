import { Flex, Text, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/router";
const ddashboard = () => {
  const router = useRouter();
  const { uid } = router.query;
  const today = format(new Date(), "do MMM, y");

  const [patient, setPatient] = useState({ phone: "", age: "" });
  const [prescription, setPrescription] = useState(null);
  const [paadhaar, setPaadhaar] = useState({ uid: "" });

  const handleChange = (e) => {
    e.preventDefault();
    setPaadhaar({ uid: e.target.value });
  };

  const handlePrescription = () => {};

  const handleUpload = () => {};

  const handleKey = async (e) => {
    if (e.code == "Enter") {
      try {
        const response = await fetch(
          "https://aef3-120-60-5-199.ngrok.io/api/aadhaar/verify",
          {
            method: "POST",
            body: JSON.stringify(paadhaar),
            headers: {
              Authentication: uid,
              Accept: "application/json",
              "Content-type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.status == "Success") {
          setPatient({ age: data.ageBand, phone: data.maskedMobileNumber });
        } else {
          alert("Aadhaar number doesn't exist.");
        }
      } catch (error) {
        alert("Failed to fetch data.");
      }
    }
  };

  return (
    <Flex h="100vh" w="100%" flexDir="column">
      <Text textAlign="right" fontWeight="600" fontSize="30px" mx={8} my={1}>
        {today}
      </Text>
      <Input
        w="40%"
        my={4}
        onKeyDown={handleKey}
        name="pname"
        placeholder="Patient Adhaar"
        value={paadhaar.uid}
        onChange={handleChange}
        mx={8}
      />
      <Text mx={8} my={2}>
        Age-band: {patient.age}
      </Text>
      <Text mx={8} my={2}>
        Phone: {patient.phone}
      </Text>
      <Input
        w={["60%", "50%", "40%", "40%"]}
        my={4}
        mx={8}
        type="file"
        capture="user"
        onChange={handlePrescription}
        accept="image/*"
      />
      <Button
        isDisabled={!patient.phone || !patient.age || !prescription}
        onClick={handleUpload}
        alignSelf="center"
        w={["30%", "30%", "20%", "10%", "10%"]}
        type="submit"
        mt={20}
      >
        Submit
      </Button>
    </Flex>
  );
};

export default ddashboard;
