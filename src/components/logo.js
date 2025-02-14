import PropTypes from "prop-types";

export const Logo = (props) => {
  const i = "https://netierfiles.blob.core.windows.net/$web/logos/netierWhite.png";

  return <img src={i} alt="Logo" />;
};

Logo.propTypes = {
  color: PropTypes.oneOf(["black", "primary", "white"]),
};
