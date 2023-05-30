import { Flex, Paper, Text } from "@mantine/core";
import { Button } from "@mui/material";
import { useState } from "react";
import Separator from "../../components/separator";
import Form from "../../components/field/form";
import {
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormControl
  } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";

const ProfilePassword = ({onClose}) => {
    const [showPasswordNow, setShowPasswordNow] = useState(false);
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
  
    const handleClickShowPasswordNow = () => setShowPasswordNow((show) => !show);
    const handleClickShowPasswordNew = () => setShowPasswordNew((show) => !show);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const methods = useForm({
        mode: "onChange",
      });

  return (
    <Paper p={36} miw={400}>
      <Form methods={methods}>
        <Flex direction="column">
          <Text fz={20} fw={600}>
            Ubah Kata Sandi
          </Text>
          <Separator _gap={24} />
          <FormControl variant="outlined" fullWidth className="change-password-form">
            <InputLabel htmlFor="outlined-adornment-password">
              Kata Sandi saat ini
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPasswordNow ? "text" : "password"}
              endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordNow}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                {showPasswordNow ? <VisibilityOff /> : <Visibility />}
                </IconButton>    
              </InputAdornment>
              }
              label="Kata Sandi saat ini"
              name="password"
            />
          </FormControl>  
          <Separator _gap={24} />
          <FormControl variant="outlined" fullWidth className="change-password-form">
            <InputLabel htmlFor="outlined-adornment-password">
              Kata Sandi baru
            </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPasswordNew ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordNew}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPasswordNew ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Kata Sandi baru"
            name="password"
          />
        </FormControl>
        <Separator _gap={24} />
        <FormControl variant="outlined" fullWidth className="change-password-form">
          <InputLabel htmlFor="outlined-adornment-password">
            Ulangi Kata Sandi baru
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Ulangi Kata Sandi baru"
            name="password"
          />
        </FormControl>
        <Separator _gap={24} />
          <Flex justify="flex-end">
            <Button variant="text" color="error" onClick={onClose}>
              Batal
            </Button>
            <Button variant="text" type="submit">
              Simpan
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Paper>
  );
};

export default ProfilePassword;
