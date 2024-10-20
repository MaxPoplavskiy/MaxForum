declare module "*.svg" {
  export default React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
}
