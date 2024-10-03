import { app } from "../config/environment";

export const getCookie = (name = app.auth.cookieName) => {
  try {
    if (process.env.REACT_APP_PRODUCTION !== "true") {
      const cookie = `${app.auth.cookieName}=${btoa(JSON.stringify(app.user))}`;
      document.cookie = cookie;
      return app.user;
    } else {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2)
        return JSON.parse(
          atob(decodeURIComponent(parts.pop().split(";").shift()))
        );
    }
  } catch (err) {
    deleteCookie(name);
    window.location.reload();
  }
};

export const deleteCookie = (name = app.auth.cookieName) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const getDisplayName = (fullName) => {
  const parts = fullName.split(",").map((part) => part.trim());
  const reversedAndJoined = parts.reverse().join(" ");
  return reversedAndJoined;
};

export const getInitialsForLogo = (fullName) => {
  const nameSegments = fullName.split(",").map((segment) => segment.trim());

  if (nameSegments.length > 1) {
    const reversedInitials = nameSegments.map((segment) => {
      return segment.charAt(0).toUpperCase();
    });
    return reversedInitials.reverse().join("");
  } else {
    const firstSegmentParts = nameSegments[0].split(" ");

    if (firstSegmentParts.length > 1) {
      const initials = firstSegmentParts.map((part) => {
        return part.charAt(0).toUpperCase();
      });
      return initials.join("");
    } else {
      return firstSegmentParts[0].charAt(0).toUpperCase();
    }
  }
};
