import { useTheme } from "@emotion/react";
import React from "react";
import { NavLink, NavLinkRenderProps } from "react-router-dom";
import { container, item, list, logo } from "./header.styles";
import { RouterKey } from "../../constants";

export const Header: React.FC = () => {
  function activeStyle({ isActive }: NavLinkRenderProps) {
    return { fontWeight: isActive ? "400" : "" };
  }

  const theme = useTheme();

  return (
    <div css={container(theme)}>
      <div css={list}>
        <NavLink to={RouterKey.ROOT} css={logo(theme)}>
          MaxFundraiser
        </NavLink>
        <NavLink to={RouterKey.FUNDRAISING.INDEX} style={activeStyle} css={item(theme)} end>
        Fundraisers
        </NavLink>
      </div>
      <div css={list}>
        <NavLink
          to={`${RouterKey.FUNDRAISING.INDEX}/${RouterKey.FUNDRAISING.MY_FUNDRAISERS}`}
          style={activeStyle}
          css={item(theme)}
        >
          My Fundraising
        </NavLink>
        <NavLink to={`${RouterKey.FUNDRAISING.INDEX}/${RouterKey.FUNDRAISING.CREATE}`} style={activeStyle} css={item(theme)}>
          Create
        </NavLink>
        <NavLink to="/account" style={activeStyle} css={item(theme)}>
          Account
        </NavLink>
      </div>
    </div>
  );
};
