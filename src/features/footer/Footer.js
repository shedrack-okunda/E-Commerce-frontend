import { Send } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MotionConfig, motion } from "framer-motion";
import {
  QRCodePng,
  appStorePng,
  googlePlayPng,
  facebookPng,
  instagramPng,
  twitterPng,
  linkedinPng,
} from "../../assets";

export const Footer = () => {
  const theme = useTheme();
  const is700 = useMediaQuery(theme.breakpoints.down(700));

  const labelStyles = {
    fontWeight: 300,
    cursor: "pointer",
  };

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.primary.main,
        paddingTop: "3rem",
        paddingLeft: is700 ? "1rem" : "3rem",
        paddingRight: is700 ? "1rem" : "3rem",
        paddingBottom: "1.5rem",
        rowGap: "5rem",
        color: theme.palette.primary.light,
        justifyContent: "space-around",
      }}
    >
      <Stack
        flexDirection={"row"}
        rowGap={"1rem"}
        justifyContent={is700 ? "" : "space-around"}
        flexWrap={"wrap"}
      >
        <Stack rowGap={"1rem"} padding={"1rem"}>
          <Typography variant="h6" fontSize={"1.5rem"}>
            Exclusive
          </Typography>
          <Typography variant="h6">Subscribe</Typography>
          <Typography sx={labelStyles}>Get 10% off your first order</Typography>
          <TextField
            placeholder="Enter your email"
            sx={{ border: "1px solid white", borderRadius: "6px" }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <Send sx={{ color: theme.palette.primary.light }} />
                </IconButton>
              ),
              style: { color: "whitesmoke" },
            }}
          />
        </Stack>

        <Stack rowGap={"1rem"} padding={"1rem"}>
          <Typography variant="h6">Support</Typography>
          <Typography sx={labelStyles}>
            Muindi Mbingu Street, Nairobi, Kenya.
          </Typography>
          <Typography sx={labelStyles}>ecommerce@gmail.com</Typography>
          <Typography sx={labelStyles}>+254 72026 0412</Typography>
        </Stack>

        <Stack rowGap={"1rem"} padding={"1rem"}>
          <Typography variant="h6">Account</Typography>
          <Typography sx={labelStyles}>My Account</Typography>
          <Typography sx={labelStyles}>Login / Register</Typography>
          <Typography sx={labelStyles}>Cart</Typography>
          <Typography sx={labelStyles}>Wishlist</Typography>
          <Typography sx={labelStyles}>Shop</Typography>
        </Stack>

        <Stack rowGap={"1rem"} padding={"1rem"}>
          <Typography variant="h6">Quick Links</Typography>
          <Typography sx={labelStyles}>Privacy Policy</Typography>
          <Typography sx={labelStyles}>Terms Of Use</Typography>
          <Typography sx={labelStyles}>FAQ</Typography>
          <Typography sx={labelStyles}>Contact</Typography>
        </Stack>

        <Stack rowGap={"1rem"} padding={"1rem"}>
          <Typography variant="h6">Download App</Typography>
          <Typography
            sx={{ ...labelStyles, color: "graytext", fontWeight: 500 }}
          >
            Save Kshs 300 with App New User Only
          </Typography>
          <Stack flexDirection={"row"} columnGap={".5rem"}>
            <Box width={"100px"} height={"100px"}>
              <img
                src={QRCodePng}
                height={"100%"}
                width={"100%"}
                style={{ objectFit: "contain" }}
                alt="QR Code"
              />
            </Box>

            <Stack justifyContent={"space-around"}>
              <Stack>
                <img
                  style={{ width: "100%", height: "100%", cursor: "pointer" }}
                  src={googlePlayPng}
                  alt="GooglePlay"
                />
              </Stack>
              <Stack>
                <img
                  style={{ width: "100%", height: "100%", cursor: "pointer" }}
                  src={appStorePng}
                  alt="AppStore"
                />
              </Stack>
            </Stack>
          </Stack>

          <Stack mt={0.6} flexDirection={"row"} columnGap={"2rem"}>
            <MotionConfig whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}>
              <motion.img
                style={{ cursor: "pointer" }}
                src={facebookPng}
                alt="Facebook"
              />
              <motion.img
                style={{ cursor: "pointer" }}
                src={twitterPng}
                alt="Twitter"
              />
              <motion.img
                style={{ cursor: "pointer" }}
                src={instagramPng}
                alt="Instagram"
              />
              <motion.img
                style={{ cursor: "pointer" }}
                src={linkedinPng}
                alt="Linkedin"
              />
            </MotionConfig>
          </Stack>
        </Stack>
      </Stack>

      <Stack alignSelf={"center"}>
        <Typography color={"GrayText"}>
          &copy; e-commerce Store {new Date().getFullYear()}. All right reserved
        </Typography>
      </Stack>
    </Stack>
  );
};
