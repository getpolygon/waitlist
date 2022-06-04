import { useForm } from "react-hook-form";
import { useJoinedStore } from "~/stores/useJoinedStore";
import { Box, Button, FilledInput, FormControl, InputLabel, Stack } from "@mui/material";
import { useCountStore } from "~/stores/useCountStore";

interface Fields {
  email: string;
};

const JoinWaitlistForm = () => {
  const { register, setError, handleSubmit, formState } = useForm<Fields>({ mode: "onChange", criteriaMode: "firstError" });
  const { errors, dirtyFields: changedFields, isDirty: isChanged, isSubmitting, isValid } = formState;
  const [count, setCount] = useCountStore((state) => [state.count, state.setCount]);
  const setJoined = useJoinedStore((state) => state.setJoined);

  const join = async (payload: Fields) => {
    if (isValid && !!changedFields && isChanged && !isSubmitting && !!errors) {
      const options = { method: "POST", body: JSON.stringify(payload) };
      const request = await fetch("/api/join", options);
      const response = await request.json();
      if (request.ok) {
        const { status } = request;
        switch (status) {
          case 500:
            return setError("email", { message: "Unknown error" });
          case 403:
            return setError("email", { message: "Address already registered" });
          case 400:
            return setError("email", { message: "Provide a correct email address" });
          case 200:
            setJoined(1); setCount(count + 1);
            return;
          default:
            console.warn("unknown response case:", status);
            return;
        }
      } else {
        console.warn("unhandled error occurred:");
        console.log({ request, response });
      }
    }
  };

  return (
    <Box width="100%">
      <form
        autoCorrect={"off"}
        autoCapitalize={"none"}
        onSubmit={handleSubmit(join)}
      >
        <Stack spacing={1}>
          <FormControl fullWidth error={!!errors?.email} variant="filled">
            <InputLabel htmlFor="email">Email address</InputLabel>
            <FilledInput
              id="email" size="small"
              fullWidth type={"email"}
              {...register("email", { required: true, pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/ })} />
          </FormControl>

          <Button
            disabled={!isChanged || !isValid || isSubmitting}
            variant="contained" type="submit">Submit</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default JoinWaitlistForm;

