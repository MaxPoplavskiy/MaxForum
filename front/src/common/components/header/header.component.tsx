import { useTheme } from "@emotion/react";
import React from "react";
import { NavLink, NavLinkRenderProps } from "react-router-dom";
import { container, item, list, logo } from "./header.styles";

export const Header: React.FC = () => {
  function activeStyle({ isActive }: NavLinkRenderProps) {
    return { fontWeight: isActive ? "400" : "" };
  }

  const theme = useTheme();

  return (
    <div css={container(theme)}>
      <div css={list}>
        <NavLink to="/" css={logo(theme)}>
          MaxFundraiser
        </NavLink>
        <NavLink to="/posts" style={activeStyle} css={item(theme)}>
          Posts
        </NavLink>
      </div>
      <div css={list}>
        <NavLink
          to={"/my-posts/username"}
          style={activeStyle}
          css={item(theme)}
        >
          My Posts
        </NavLink>
        <NavLink to="/create" style={activeStyle} css={item(theme)}>
          Create
        </NavLink>
        <NavLink to="/account" style={activeStyle} css={item(theme)}>
          Account
        </NavLink>
      </div>
    </div>
  );
};
