import React from 'react'
import { url } from 'inspector'

// import { Container } from './styles';

const CarteirinhaSVG = ({
  pk,
  nome,
  matrícula,
  birth,
  turma,
  cpf,
  foto,
  categoria,
}) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156 98.45">
        <defs>
          <clipPath id="clip-path" transform="translate(-43.89 -27.31)">
            <rect x="137" y="36" width="53.88" height="16.53" fill="none" />
          </clipPath>
          <clipPath id="clip-path-3" transform="translate(-43.89 -27.31)">
            <circle id="photo" cx="72" cy="60" r="18" fill="none" />
          </clipPath>
        </defs>
        <g id="card">
          <g id="bg">
            <path
              d="M199.89,31v91.17a3.64,3.64,0,0,1-3.65,3.64H47.54a3.64,3.64,0,0,1-3.65-3.64V31a3.64,3.64,0,0,1,3.65-3.64h148.7A3.64,3.64,0,0,1,199.89,31Z"
              transform="translate(-43.89 -27.31)"
              fill="#ededed"
            />
          </g>
          <g id="header">
            <path
              id="bg-2"
              data-name="bg"
              d="M199.89,32.79V63h-156V32.79A8.26,8.26,0,0,1,44,31.45c.4-2.38,1.83-4.14,3.54-4.14h148.7C198.26,27.31,199.89,29.77,199.89,32.79Z"
              transform="translate(-43.89 -27.31)"
              fill="#14783c"
            />
            <g id="logo">
              <g clipPath="url(#clip-path)">
                <g clipPath="url(#clip-path)">
                  <path
                    d="M138,51.85l0,.08,0-.08,0-.07.68-1.23a.08.08,0,0,1,0,0h.25v2h-.23V50.9l-.68,1.25c0,.05-.06.07-.1.07h0a.1.1,0,0,1-.1-.07l-.7-1.25s0,.05,0,.07V52.5H137v-2h.26l0,0,.69,1.23,0,.07"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <polygon
                    points="98.05 23.2 98.05 23.41 97.09 23.41 97.09 24.08 97.86 24.08 97.86 24.29 97.09 24.29 97.09 24.97 98.05 24.97 98.05 25.19 96.81 25.19 96.81 23.2 98.05 23.2"
                    fill="#fff"
                  />
                  <path
                    d="M145.18,51.51a1.06,1.06,0,0,1-.08.4.76.76,0,0,1-.2.32.83.83,0,0,1-.31.2,1,1,0,0,1-.4.07h-.75v-2h.75a1,1,0,0,1,.4.08.72.72,0,0,1,.31.2.76.76,0,0,1,.2.32,1.07,1.07,0,0,1,.08.41m-.28,0a1,1,0,0,0-.05-.33.86.86,0,0,0-.14-.25.57.57,0,0,0-.23-.15.68.68,0,0,0-.29-.06h-.47v1.57h.47a.68.68,0,0,0,.29-.06.57.57,0,0,0,.23-.15.86.86,0,0,0,.14-.25,1,1,0,0,0,.05-.32"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <rect
                    x="102.82"
                    y="23.19"
                    width="0.27"
                    height="2"
                    fill="#fff"
                  />
                  <path
                    d="M150,52.09l0,0,.11.12a1,1,0,0,1-.3.22,1.08,1.08,0,0,1-.42.08.93.93,0,0,1-.39-.08.81.81,0,0,1-.3-.21.87.87,0,0,1-.2-.32,1.35,1.35,0,0,1-.06-.41,1.12,1.12,0,0,1,.07-.42,1.16,1.16,0,0,1,.2-.32,1,1,0,0,1,.32-.21,1.11,1.11,0,0,1,.41-.08,1.07,1.07,0,0,1,.38.07.92.92,0,0,1,.28.19l-.08.12,0,0H150l-.05,0-.06-.05-.09,0-.12,0h-.16a.84.84,0,0,0-.29.05.63.63,0,0,0-.23.16.58.58,0,0,0-.15.25.81.81,0,0,0-.06.33.88.88,0,0,0,.06.33.68.68,0,0,0,.14.25.66.66,0,0,0,.5.2h.16a.31.31,0,0,0,.13,0,.24.24,0,0,0,.11-.06l.11-.08,0,0"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <rect
                    x="107.82"
                    y="23.19"
                    width="0.27"
                    height="2"
                    fill="#fff"
                  />
                  <path
                    d="M153.83,50.51l0,0L155,52.06V50.5h.23v2h-.19l0,0L153.86,51a.17.17,0,0,1,0,.07V52.5h-.24v-2h.2"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <path
                    d="M158.5,52.5h-.26l0-.05L158,52h-.9l-.19.48,0,0a.07.07,0,0,1-.06,0h-.21l.8-2h.27Zm-1.31-.74h.75l-.31-.81a1.45,1.45,0,0,1-.06-.19l0,.11,0,.08Z"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <path
                    d="M162.3,52.29a.56.56,0,0,0,.23,0,.48.48,0,0,0,.16-.12.4.4,0,0,0,.1-.18.59.59,0,0,0,0-.23V50.5h.27v1.22A.83.83,0,0,1,163,52a.84.84,0,0,1-.15.26.85.85,0,0,1-.25.17.9.9,0,0,1-.34.06.88.88,0,0,1-.33-.06.74.74,0,0,1-.25-.17.87.87,0,0,1-.16-.26,1.07,1.07,0,0,1-.05-.32V50.5h.27v1.22a.85.85,0,0,0,0,.23.54.54,0,0,0,.11.18.48.48,0,0,0,.16.12.54.54,0,0,0,.22,0"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <path
                    d="M164.87,50.51s0,0,0,0l1.16,1.51V52a.2.2,0,0,1,0-.07V50.5h.24v2h-.19l0,0L164.91,51a.17.17,0,0,0,0,.07V52.5h-.24v-2h.19"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <rect
                    x="124.07"
                    y="23.19"
                    width="0.27"
                    height="2"
                    fill="#fff"
                  />
                  <path
                    d="M170.07,50.51l0,0,1.16,1.51s0-.05,0-.07V50.5h.24v2h-.19s0,0,0,0L170.11,51V51s0,0,0,.06V52.5h-.24v-2h.19"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <path
                    d="M175,51.51a1.14,1.14,0,0,1-.07.41,1,1,0,0,1-.2.32,1,1,0,0,1-.31.21,1.07,1.07,0,0,1-.41.08,1.06,1.06,0,0,1-.4-.08,1,1,0,0,1-.31-.21,1,1,0,0,1-.2-.32,1.14,1.14,0,0,1-.07-.41,1.16,1.16,0,0,1,.07-.42,1,1,0,0,1,.2-.32,1,1,0,0,1,.31-.21,1.06,1.06,0,0,1,.4-.08,1.07,1.07,0,0,1,.41.08,1,1,0,0,1,.31.21,1,1,0,0,1,.2.32,1.16,1.16,0,0,1,.07.42m-.28,0a.9.9,0,0,0-.05-.34.63.63,0,0,0-.14-.24.69.69,0,0,0-.22-.16.94.94,0,0,0-.3-.05.93.93,0,0,0-.29.05.69.69,0,0,0-.22.16.63.63,0,0,0-.14.24.9.9,0,0,0,0,.34.88.88,0,0,0,0,.33.72.72,0,0,0,.14.24.69.69,0,0,0,.22.16.93.93,0,0,0,.29,0,.94.94,0,0,0,.3,0,.69.69,0,0,0,.22-.16.72.72,0,0,0,.14-.24.88.88,0,0,0,.05-.33"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <path
                    d="M176.14,50.5h.22l.06,0,0,0L177,52l0,.1,0,.12,0-.12,0-.1.57-1.41s0,0,0,0a.09.09,0,0,1,.06,0H178l-.82,2H177Z"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <path
                    d="M180.84,52.5h-.27l0-.05-.19-.48h-.89l-.19.48,0,0a.07.07,0,0,1-.06,0H179l.8-2H180Zm-1.31-.74h.75L180,51a.69.69,0,0,1-.07-.19.43.43,0,0,0,0,.11l0,.08Z"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <polygon
                    points="139.55 23.2 139.55 23.41 138.59 23.41 138.59 24.11 139.41 24.11 139.41 24.34 138.59 24.34 138.59 25.19 138.32 25.19 138.32 23.2 139.55 23.2"
                    fill="#fff"
                  />
                  <path
                    d="M186.37,52.5h-.27s0,0,0-.05l-.19-.48H185l-.18.48a.08.08,0,0,1,0,0s0,0-.06,0h-.21l.8-2h.28Zm-1.31-.74h.74l-.31-.81a1.45,1.45,0,0,1-.06-.19l0,.11,0,.08Z"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <path
                    d="M188,51.76v.74h-.27v-2h.59a1,1,0,0,1,.33,0,.67.67,0,0,1,.24.12.53.53,0,0,1,.13.2.7.7,0,0,1,0,.25.71.71,0,0,1,0,.26.56.56,0,0,1-.14.2.78.78,0,0,1-.24.13,1,1,0,0,1-.32,0Zm0-.22h.32a.66.66,0,0,0,.21,0,.38.38,0,0,0,.15-.09.3.3,0,0,0,.09-.13.43.43,0,0,0,0-.17.37.37,0,0,0-.12-.29.49.49,0,0,0-.36-.11H188Z"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <rect
                    x="146.72"
                    y="23.19"
                    width="0.27"
                    height="2"
                    fill="#fff"
                  />
                  <path
                    d="M163.12,48.57V47.31a.46.46,0,0,0,.31-.19,1.41,1.41,0,0,0,.08-.59V43.07a1.44,1.44,0,0,0-.08-.59.5.5,0,0,0-.31-.19v-1.2h5.14v2.29h-1.52v-.07a.75.75,0,0,0-.19-.59.91.91,0,0,0-.64-.17h-.67v1.52h1.94v1.26h-1.94v1.2a1.53,1.53,0,0,0,.08.6.34.34,0,0,0,.3.18v1.26Z"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <path
                    d="M168.69,42.3V41.09h2.52V42.3a.53.53,0,0,0-.3.24,1.58,1.58,0,0,0-.09.66v2.91A1.48,1.48,0,0,0,171,47a.69.69,0,0,0,.6.26.73.73,0,0,0,.62-.27,1.39,1.39,0,0,0,.2-.82V43a1,1,0,0,0-.09-.48.48.48,0,0,0-.31-.21V41.09h2.28V42.3a.46.46,0,0,0-.32.2,1.35,1.35,0,0,0-.09.6v3.11a4.41,4.41,0,0,1-.1,1.1,1.79,1.79,0,0,1-.36.68,2,2,0,0,1-.79.56,2.85,2.85,0,0,1-1.08.19,2.48,2.48,0,0,1-1.89-.61,3,3,0,0,1-.57-2.05v-3a1.08,1.08,0,0,0-.09-.54.58.58,0,0,0-.33-.22"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <path
                    d="M177.32,46.55a1.46,1.46,0,0,0,.08.6.51.51,0,0,0,.3.18v1.26h-2.5V47.33a.5.5,0,0,0,.31-.19,1.44,1.44,0,0,0,.08-.59V43.08a1.46,1.46,0,0,0-.08-.6.46.46,0,0,0-.31-.18V41.09h3a2.85,2.85,0,0,1,1.89.51,2.51,2.51,0,0,1,.3,2.79,1.46,1.46,0,0,1-.85.59,1.38,1.38,0,0,1,.75.38,1.32,1.32,0,0,1,.2.8v.41a1.42,1.42,0,0,0,.08.57.33.33,0,0,0,.25.19v1.26h-1.86a1.6,1.6,0,0,1-.11-.39,4.14,4.14,0,0,1,0-.71v-1a1,1,0,0,0-.19-.74,1,1,0,0,0-.71-.19h-.54Zm0-2.27H178a1,1,0,0,0,.7-.21.89.89,0,0,0,.22-.67.94.94,0,0,0-.22-.69.9.9,0,0,0-.68-.22h-.7Z"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <path
                    d="M185.19,48.59V47.33a.48.48,0,0,0,.27-.21,1.57,1.57,0,0,0,.18-.58l1.06-5.45h2.58l1.17,5.57a1.29,1.29,0,0,0,.17.48.51.51,0,0,0,.26.19v1.26h-2.55V47.33a.47.47,0,0,0,.27-.11.33.33,0,0,0,.1-.25v-.1s0-.07,0-.12l-.06-.31h-1.45l-.06.28a1.05,1.05,0,0,0,0,.13V47a.38.38,0,0,0,.09.28.52.52,0,0,0,.31.1v1.26Zm2.17-3.22h1l-.52-2.87Z"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <path
                    d="M137,48.58V47.32a.48.48,0,0,0,.27-.21,1.57,1.57,0,0,0,.18-.58l1.07-5.47h2.58l1.17,5.59a1.49,1.49,0,0,0,.17.48.49.49,0,0,0,.27.19v1.26h-2.56V47.32a.47.47,0,0,0,.27-.11.3.3,0,0,0,.1-.25v-.09a.5.5,0,0,0,0-.12l-.06-.32H139l-.07.29c0,.05,0,.09,0,.13a.28.28,0,0,0,0,.09.34.34,0,0,0,.1.28.49.49,0,0,0,.31.1v1.26Zm2.17-3.22h1l-.52-2.88Z"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <path
                    d="M145.14,48.58V47.32a.54.54,0,0,0,.28-.21,2.08,2.08,0,0,0,.18-.58l1.06-5.47h2.59l1.17,5.59a1.29,1.29,0,0,0,.17.48.51.51,0,0,0,.26.19v1.26h-2.56V47.32a.48.48,0,0,0,.28-.11.34.34,0,0,0,.1-.25.34.34,0,0,0,0-.09.49.49,0,0,0,0-.12l-.07-.32h-1.45l-.06.29c0,.05,0,.09,0,.13v.09a.38.38,0,0,0,.09.28.52.52,0,0,0,.31.1v1.26Zm2.18-3.22h1l-.51-2.88Z"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <path
                    d="M153.33,48.58V47.32a.54.54,0,0,0,.28-.21,2.08,2.08,0,0,0,.18-.58l1.06-5.47h2.58l1.17,5.59a1.49,1.49,0,0,0,.17.48.53.53,0,0,0,.27.19v1.26h-2.56V47.32a.44.44,0,0,0,.27-.11.31.31,0,0,0,.11-.25s0-.05,0-.09,0-.08,0-.12l-.07-.32h-1.45l-.07.29c0,.05,0,.09,0,.13s0,.06,0,.09a.38.38,0,0,0,.1.28.49.49,0,0,0,.31.1v1.26Zm2.18-3.22h1L156,42.48Z"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <rect
                    x="107.64"
                    y="20.15"
                    width="1.12"
                    height="1.12"
                    fill="#fff"
                  />
                  <rect
                    x="115.76"
                    y="20.15"
                    width="1.12"
                    height="1.12"
                    fill="#fff"
                  />
                  <rect
                    x="99.48"
                    y="20.15"
                    width="1.12"
                    height="1.12"
                    fill="#fff"
                  />
                  <path
                    d="M183.12,40.79a1.54,1.54,0,0,0,1.11-.45,1.51,1.51,0,0,0,.46-1.11,1.56,1.56,0,0,0-.36-1l-.54.53V39a.29.29,0,0,1-.24.29h-.07a.33.33,0,0,1-.25-.15.34.34,0,0,1-.22-.07,1.07,1.07,0,0,0-.19-.34.3.3,0,0,1,0-.23.37.37,0,0,1,.16-.17l.2-.09.52-.51a1.51,1.51,0,0,0-.48-.09.42.42,0,0,1-.09.14l-.71.82,0,.28a.29.29,0,0,1-.29.27h0a.32.32,0,0,1-.21-.12.36.36,0,0,1-.2-.06s-.05,0-.06-.07a1.19,1.19,0,0,0,0,.33,1.48,1.48,0,0,0,.48,1.09,1.54,1.54,0,0,0,1.12.47"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <path
                    d="M184.67,36.48a3.21,3.21,0,0,0-2.93-.23v0a1,1,0,0,0-.22-.21.25.25,0,0,0-.3,0A2.94,2.94,0,0,0,180,37.8a.17.17,0,0,0,.21.21l2.18-.54a.08.08,0,0,0,0-.11l-.12-.23h0v0l-.15-.26a.31.31,0,0,1,.22.15l.21.39c0,.08,0,.13,0,.2l-.61.7-.28.13a.07.07,0,0,0,0,.09.07.07,0,0,0,.07,0h0l.2-.09-.17.24a.06.06,0,0,0,0,.09s0,0,.05,0l.05,0,.17-.25,0,.32s0,.07.06.08h0a.07.07,0,0,0,.07-.06l0-.36.77-.87a.21.21,0,0,0,0-.25l-.28-.54h0a.3.3,0,0,1,.18.16v0l.05.08,0,0v0l.06.11a.18.18,0,0,0,.15.1,2.2,2.2,0,0,1,.78.18l-.27-.62s.1,0,.16.17l0,.08h0l0,0h0l.11.25v0a.19.19,0,0,1,0,.21l-.71.69-.23.11s-.05.05,0,.09a.09.09,0,0,0,.08,0h0l.21-.09-.18.21a.08.08,0,0,0,0,.1.07.07,0,0,0,.06,0l0,0,.18-.21V39a.07.07,0,0,0,.07.07h0a.06.06,0,0,0,.06-.06v-.36l.78-.77a.26.26,0,0,0,.06-.3l-.09-.22-.11-.26a.36.36,0,0,1,.19.21h0l.1.24a.34.34,0,0,1,0,.32,2.64,2.64,0,0,1,.82,1.92,0,0,0,0,0,0,0,.28.28,0,0,0,0,.09,2.79,2.79,0,0,1-2.43,2.2,2.53,2.53,0,0,1-2.64-1.32,2.59,2.59,0,0,0,2.09,1.61,3.77,3.77,0,0,0,3.42-1.46,3.23,3.23,0,0,0-1.06-4.46m-3.12.55-.89.43a.05.05,0,0,1-.08-.06,1.6,1.6,0,0,1,.49-.87.07.07,0,0,1,.07,0,1,1,0,0,1,.43.44.05.05,0,0,1,0,.08"
                    transform="translate(-43.89 -27.31)"
                    fill="#9dcc4a"
                  />
                  <path
                    d="M182.74,41.8a2.67,2.67,0,0,0,1.53-.71h-2.49v.67a2.33,2.33,0,0,0,1,0"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <path
                    d="M184,42.48a.41.41,0,0,1,.29-.18v0a4.54,4.54,0,0,1-1.69.34,2.61,2.61,0,0,1-.4,0h-.07a2.09,2.09,0,0,1,0,.52v3.47a1.44,1.44,0,0,1-.08.59.51.51,0,0,1-.3.19v1.26h2.49V47.33a.49.49,0,0,1-.29-.18,1.46,1.46,0,0,1-.08-.6V43.08a1.46,1.46,0,0,1,.08-.6"
                    transform="translate(-43.89 -27.31)"
                    fill="#fff"
                  />
                  <polygon
                    points="129.05 11.95 127.47 13.49 128.72 13.49 130.75 11.95 129.05 11.95"
                    fill="#fff"
                  />
                </g>
              </g>
            </g>
          </g>
          <g id="photo_bg_border" data-name="photo bg border">
            <circle cx="28.11" cy="32.69" r="19" fill="#ededed" />
          </g>
        </g>
        <g id="content">
          <g id="foto">
            <g clipPath="url(#clip-path-3)">
              <image
                width="320"
                height="320"
                transform="translate(9.61 14.19) scale(0.12)"
                href={foto}
              />
            </g>
          </g>
          <g id="ident">
            <text
              id="matrícula"
              transform="translate(48.48 50.09)"
              fontSize="4"
              fill="#4d4d4a"
              fontFamily="Lato-Regular, Lato"
            >
              18107053
            </text>
            <text
              id="nome"
              transform="translate(48.48 45.09)"
              fontSize="5"
              fill="#14783c"
              fontFamily="Lato-Bold, Lato"
              fontWeight="700"
            >
              {nome}
            </text>
          </g>
          <g id="info1">
            <g id="divider">
              <rect x="44.46" y="56.69" width="0.3" height="33" fill="#ccc" />
            </g>
            <g id="cpf">
              <text
                id="title"
                transform="translate(9.11 84.75)"
                fontSize="3.5"
                fill="#4d4d4a"
                fontFamily="Lato-Light, Lato"
                fontWeight="300"
              >
                CPF
              </text>
              <text
                id="value"
                transform="translate(9.11 88.75)"
                fontSize="3.5"
                fill="#4d4d4a"
                fontFamily="Lato-Regular, Lato"
              >
                {cpf}
              </text>
            </g>
            <g id="data_de_nascimento">
              <text
                id="title-2"
                data-name="title"
                transform="translate(9.11 72.21)"
                fontSize="3.5"
                fill="#4d4d4a"
                fontFamily="Lato-Light, Lato"
                fontWeight="300"
              >
                Data de nascimento
              </text>
              <text
                id="value-2"
                data-name="value"
                transform="translate(9.11 76.21)"
                fontSize="3.5"
                fill="#4d4d4a"
                fontFamily="Lato-Regular, Lato"
              >
                {birth}
              </text>
            </g>
            <g id="sócionum">
              <text
                id="title-3"
                data-name="title"
                transform="translate(9.11 59.68)"
                fontSize="3.5"
                fill="#4d4d4a"
                fontFamily="Lato-Light, Lato"
                fontWeight="300"
              >
                Sócio Nº
              </text>
              <text
                id="value-3"
                data-name="value"
                transform="translate(9.11 63.68)"
                fontSize="3.5"
                fill="#4d4d4a"
                fontFamily="Lato-Regular, Lato"
              >
                {pk}
              </text>
            </g>
          </g>
          <g id="info2">
            <g id="divider-2" data-name="divider">
              <rect x="85.11" y="56.69" width="0.3" height="33" fill="#ccc" />
            </g>
            <g id="validade">
              <text
                id="title-4"
                data-name="title"
                transform="translate(49.76 84.75)"
                fontSize="3.5"
                fill="#4d4d4a"
                fontFamily="Lato-Light, Lato"
                fontWeight="300"
              >
                Válida até
              </text>
              <text
                id="value-4"
                data-name="value"
                transform="translate(49.76 88.75)"
                fontSize="3.5"
                fill="#4d4d4a"
                fontFamily="Lato-Regular, Lato"
              >
                dd/mm/AAAA
              </text>
            </g>
            <g id="categoria">
              <text
                id="title-5"
                data-name="title"
                transform="translate(49.76 72.21)"
                fontSize="3.5"
                fill="#4d4d4a"
                fontFamily="Lato-Light, Lato"
                fontWeight="300"
              >
                Categoria
              </text>
              <text
                id="value-5"
                data-name="value"
                transform="translate(49.76 76.21)"
                fontSize="3.5"
                fill="#4d4d4a"
                fontFamily="Lato-Regular, Lato"
              >
                {categoria == 'S' && 'SEMESTRAL'}
                {categoria == 'A' && 'ANUAL'}
              </text>
            </g>
            <g id="turma">
              <text
                id="title-6"
                data-name="title"
                transform="translate(49.76 59.68)"
                fontSize="3.5"
                fill="#4d4d4a"
                fontFamily="Lato-Light, Lato"
                fontWeight="300"
              >
                Turma
              </text>
              <text
                id="value-6"
                data-name="value"
                transform="translate(49.76 63.68)"
                fontSize="3.5"
                fill="#4d4d4a"
                fontFamily="Lato-Regular, Lato"
              >
                {turma}
              </text>
            </g>
          </g>
        </g>
      </svg>
    </>
  )
}

export default CarteirinhaSVG