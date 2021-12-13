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
import axios from "axios";
import { useState } from "react";
import { IoMail } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { email } from "../utils/patterns";
import { useJoinedStore } from "../stores/useJoinedStore";

type WaitlistFormFields = {
  email: string;
};

const JoinWaitlistForm = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormFields>();
  const [submitting, setSubmitting] = useState(false);
  const setJoined = useJoinedStore((state) => state.setJoined);
  // prettier-ignore
  const toast = useToast({ duration: 5000, position: "bottom" });

  const joinWaitlist = async ({ email }: WaitlistFormFields) => {
    setSubmitting(true);

    // prettier-ignore
    const { data, status } = await axios.post("/api/join", { email }, { validateStatus: () => true });

    setSubmitting(false);

    if (status !== 200) {
      if (status !== 500) {
        return setError("email", { message: data.message });
      }

      return toast({
        status: "error",
        description: data.message,
        title: "There was an error",
      });
    }

    setJoined(true);

    return toast({
      status: "success",
      title: "Thank you 🥳",
      description: "You have successfully joined our waitlist!",
    });
  };

  return (
    <Box>
      <form
        autoCorrect={"off"}
        autoComplete={"off"}
        autoCapitalize={"none"}
        onSubmit={handleSubmit(joinWaitlist)}
      >
        <Stack>
          <Box>
            <Text fontSize={["md", "lg"]}>
              Want to stay up to date? You can join our waitlist too!
            </Text>
          </Box>

          <Stack direction={["column", "row"]}>
            <FormControl maxW={"xl"} isInvalid={errors.email && true}>
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

              <FormErrorMessage>
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
