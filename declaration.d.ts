declare module "*.module.css";
declare module "*.module.scss";
declare module "*.scss" {
    const content: { [className: string]: string };
    export = content;
}