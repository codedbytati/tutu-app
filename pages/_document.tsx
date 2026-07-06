import Document, { Head, Html, Main, NextScript, type DocumentContext, type DocumentInitialProps } from 'next/document'

class BytebankDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    return await Document.getInitialProps(ctx)
  }

  render() {
    return (
      <Html lang='pt-BR'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default BytebankDocument
