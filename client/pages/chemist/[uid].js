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
  Button
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const cdashboard = () => {
  const router = useRouter();
  const { uid } = router.query;

  const [paadhaar, setPaadhaar] = useState({ patient: "" });
  const [isLoaded, setIsLoaded] = useState(false);
  const [meds, setMeds] = useState([]);
  const [otp, setotp] = useState("");

  // const handleKey = async (e) => {
  //   if (e.code == "Enter") {
  //     try {
        // const response = await fetch("url_to_server/api/prescription", {
        //   method: "POST",
        //   body: JSON.stringify(paadhaar),
        //   headers: {
        //     Authorization: "Bearer " + uid,
        //     Accept: "application/json",
        //     "Content-type": "application/json",
        //   },
        // });
        // const data = await response.json();
        // if (data.uid == paadhaar.patient) {
        //   setMeds(data.prescriptions);
        //   setIsLoaded(true);
        // } else {
        //   alert("No active prescriptions.");
        // }
  //     } catch (error) {
  //       alert("Failed to fetch data.");
  //     }
  //   }
  // };

  const sendOTP = async () => {
    const response = await fetch("https://hackoverflow.herokuapp.com/api/otp/send",{
      method: "POST",
          body: JSON.stringify({uid: paadhaar.patient}),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
    })
    const data = await response.json()
    console.log(data)
    if(data.result == "Success"){
      alert("OTP sent successfully.")
    } else {
      alert("Failed to send OTP.")
    }
  }

  const verifyOTP = async () => {
    const response = await fetch("https://hackoverflow.herokuapp.com/api/otp/verify",{
      method: "POST",
          body: JSON.stringify({uid:paadhaar.patient, otp:otp}),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
    })
    const data = await response.json()
    if(data.response == "Sucess"){  //fix spelling
      try {
        const response = await fetch("https://hackoverflow.herokuapp.com/api/prescription", {
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
        alert("Failed to fetch data.")
      }
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    setPaadhaar({ patient: e.target.value });
  };

  return (
    <Flex h="100vh" w="100%" flexDir="column">
      <Flex>
        <Input
          w={["50%", "40%", "40%"]}
          my={8}
          placeholder="Patient Aadhaar"
          value={paadhaar.patient}
          onChange={handleChange}
          mx={8}
        />
        <Button onClick={sendOTP} mx={4} my={8}>
          Send OTP
        </Button>
      </Flex>
      <Flex>
        <Input
        w={["50%", "40%", "40%"]}
          value={otp}
          onChange={(e) => {
            e.preventDefault();
            setotp(e.target.value);
          }}
          placeholder="Enter OTP"
          mx={8}
        />
        <Button isDisabled={!otp} mx={4} onClick={verifyOTP}>Verify OTP</Button>
      </Flex>
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
