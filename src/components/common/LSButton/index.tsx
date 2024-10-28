import React, { PropsWithChildren } from "react";
import styles from './index.module.css'
interface LSButtonProps extends Omit<React.HtmlHTMLAttributes<any>, 'children'> {
  children?: React.ReactNode
}
export default function LSButton({ children, className, style, onClick }: LSButtonProps) {
  return <button className={ `${styles['ls-button']} ${className}`} style={style}
            onClick={onClick}>
    { children }
  </button>

}