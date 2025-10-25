import React from "react";
import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const DEFAULT_ITEMS = [
  { label: "Home", to: "/merch" },
  { label: "Shop", to: "/shop" },
];

const MerchNavBar = ({
  items = DEFAULT_ITEMS,
  sx,
  itemSx,
  fontSize = { xs: 18, md: 20 },
  fontWeight = 300,
  ...boxProps
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        ...sx,
      }}
      {...boxProps}
    >
      {items.map((item, index) => {
        const key = item.key ?? item.to ?? `${item.label ?? "item"}-${index}`;

        if (item.node) {
          return (
            <Box key={key} sx={{ ...itemSx, ...(item.sx || {}) }}>
              {item.node}
            </Box>
          );
        }

        const typographyProps = {
          key,
          variant: item.variant ?? "h6",
          sx: {
            textDecoration: "none",
            color: "#000",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: item.fontWeight ?? fontWeight,
            fontSize: item.fontSize ?? fontSize,
            cursor: item.to ? "pointer" : "default",
            ...itemSx,
            ...(item.sx || {}),
          },
        };

        if (item.to) {
          return (
            <Typography component={RouterLink} to={item.to} {...typographyProps}>
              {item.label}
            </Typography>
          );
        }

        return <Typography {...typographyProps}>{item.label}</Typography>;
      })}
    </Box>
  );
};

export default MerchNavBar;
