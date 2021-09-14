import {
  Stack,
  Input,
  FormControl,
  Button,
  useToast,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Icon,
  Text,
  Box,
} from "@chakra-ui/react";
import { View } from "../pages";
import { IoMail } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { email } from "../utils/patterns";
import { Dispatch, SetStateAction, useState } from "react";

type WaitlistFormFields = {
  email: string;
};

const JoinWaitlistForm = ({
  setView,
}: {
  setView: Dispatch<SetStateAction<View>>;
}) => {
  const toast = useToast({
    duration: 5000,
    position: "bottom",
  });
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormFields>();
  const [submitting, setSubmitting] = useState(false);

  const joinWaitlist = async ({ email }: WaitlistFormFields) => {
    setSubmitting(true);

    const response = await fetch("/api/join", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    setSubmitting(false);

    if (response.status !== 200) {
      const jsonResponse = (await response.json()) as {
        status: "OK" | "ERR";
        message: string;
      };

      if (response.status !== 500) {
        setError("email", { message: jsonResponse.message });
      }

      return toast({
        status: "error",
        title: "There was an error",
        description: jsonResponse.message,
      });
    } else {
      localStorage.joined = true;
      setView("JoinedWaitlist");
      return toast({
        status: "success",
        title: "Thank you 🥳",
        description: "You have successfully joined our waitlist!",
      });
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(joinWaitlist)}>
        <Stack>
          <Box>
            <Text fontFamily={"ubuntu"} fontSize={["md", "lg"]}>
              Want to stay up to date? You can join our waitlist too!
            </Text>
            <Text fontSize={"xs"}>No spam, no bullshit</Text>
          </Box>

          <Stack direction={["column", "row"]}>
            <FormControl maxW={"sm"} isInvalid={errors.email && true}>
              <InputGroup>
                <InputLeftElement
                  h={"full"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Icon
                    as={IoMail}
                    fontSize={"xl"}
                    color={"gray.600"}
                    pointerEvents={"none"}
                  />
                </InputLeftElement>

                <Input
                  size={"lg"}
                  id={"email"}
                  type={"email"}
                  {...register("email", {
                    pattern: email,
                    required: true,
                  })}
                  placeholder={"john@doe.org"}
                />
              </InputGroup>

              <FormErrorMessage fontFamily={"ubuntu"}>
                {(errors.email && errors.email.message) ||
                  "Please enter a valid email address"}
              </FormErrorMessage>
            </FormControl>

            <Button
              m={12}
              size={"lg"}
              type={"submit"}
              isLoading={submitting}
              bgColor={"purple.400"}
              colorScheme={"purple"}
              disabled={errors.email && true}
            >
              Join
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default JoinWaitlistForm;
