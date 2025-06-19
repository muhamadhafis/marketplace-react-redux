import { ContactMeButton } from "./ContactMeButton";

export const Footer = (props) => {
  return (
    <footer className="min-h-16 py-8 border-t flex items-center justify-between px-20 mt-12">
      <p>
        <span className="font-mono tracking-tighter font-bold text-xl">
          Oktav00
        </span>{" "}
        Copyright 2025
      </p>
      <ContactMeButton>{props.children}</ContactMeButton>
    </footer>
  );
};
