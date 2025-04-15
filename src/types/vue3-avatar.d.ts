declare module 'vue3-avatar' {
  import { DefineComponent } from 'vue';

  const Avatar: DefineComponent<{
    name?: string;
    size?: number | string;
    rounded?: boolean;
    color?: string;
    background?: string;
    lighten?: number;
    shadow?: string;
    customStyle?: Record<string, string>;
  }>;

  export default Avatar;
}
