## UPDATE LOGO

src\components\logo.js




src\layouts\top-nav.js

HIDE THE DIVIDER \ CHANGE THE SIZE OF THE LOGO

          <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: 3,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={3}
          divider={
            <Divider
              orientation="vertical"
              sx={{
                borderColor: "neutral.500",
                height: 36,
                display: "none",
              }}
            />
          }
        >
          <Box
            component={NextLink}
            href={paths.index}
            sx={{
              display: "inline-flex",
              height: 45,
              width: 260,
            }}
          >
            <Logo />
          </Box>

