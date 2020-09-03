import Document, {
  DocumentProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'

class MyDocument extends Document<DocumentProps> {
  render(): JSX.Element {
    return (
      <Html lang="pt-br">
        <Head>
          <meta charSet="utf-8" />

          <meta
            name="google-site-verification"
            content="U7CpZMuHTQ3ejuTUoko1x_V6fZwoIj2lkfQ1XH3ZkBs"
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/favicon-16x16.png"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="https://furiav2-assets.s3.sa-east-1.amazonaws.com/public/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#e9e9e9" />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
            as="style"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
          />
        </Head>
        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
