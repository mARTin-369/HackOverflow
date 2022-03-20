import { Flex, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [user, setUser] = useState("Doctor Phone");
  const [values, setValues] = useState({ lid: "", phone: "" });
  const [chemID, setChemID] = useState({ reg: "" });

  const router = useRouter();

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChemSubmit = async () => {
    try {
      const response = await fetch("https://hackoverflow.herokuapp.com/api/retailer/login", {
        method: "POST",
        body: JSON.stringify(chemID),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.message == "Login successful") {
        router.push({ pathname: "/chemist/[uid]", query: { uid: data.token } });
      } else {
        alert("Wrong credentials.");
      }
    } catch (error) {
      alert("Failed to fetch data.");
    }
  };

  const handleDocSubmit = async () => {
    try {
      const response = await fetch("https://hackoverflow.herokuapp.com/api/doctor/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.message == "Login successful") {
        router.push({ pathname: "/doctor/[uid]", query: { uid: data.token } });
      } else {
        alert("Wrong credentials.");
      }
    } catch (error) {
      alert("Failed to fetch data.");
    }
  };

  return (
    <Flex h="100vh" w="100%" alignItems="center" flexDir="column">
      <Flex mt={20}>
        <Button m={4} onClick={(e) => setUser("Doctor Phone")}>
          Doctor
        </Button>
        <Button m={4} onClick={(e) => setUser("Chemist ID")}>
          Chemist
        </Button>
      </Flex>
      <Flex w="30%" flexDir="column" alignItems="center">
        {user == "Chemist ID" ? (
          <Input
            type="text"
            value={chemID.reg}
            my={3}
            w="40vw"
            onChange={(e) => {
              e.preventDefault();
              setChemID({ reg: e.target.value });
            }}
            placeholder="Chemist ID"
          ></Input>
        ) : (
          <>
            <Input
              type="text"
              value={values.phone}
              onChange={handleChange}
              my={3}
              w="40vw"
              name="phone"
              placeholder="Doctor Phone"
            />
            <Input
              type="password"
              value={values.password}
              onChange={handleChange}
              w="40vw"
              name="lid"
              my={3}
              placeholder="Password"
            />
          </>
        )}
      </Flex>
      <Flex flexDir="column" mt={10}>
        {user == "Doctor Phone" ? (
          <>
            <Button
              isDisabled={!values.lid || !values.phone}
              onClick={handleDocSubmit}
            >
              Doctor Login
            </Button>
          </>
        ) : null}
        {user == "Chemist ID" ? (
          <>
            <Button isDisabled={!chemID.reg} onClick={handleChemSubmit}>
              Chemist Login
            </Button>
          </>
        ) : null}
      </Flex>
    </Flex>
  );
}
