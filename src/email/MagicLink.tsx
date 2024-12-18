import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export function MagicLinkEmail(props: { url: string }) {
  const { url } = props;

  return (
    <Html lang="en">
      <Head />
      <Preview>Verify your email address</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section>
            <Text style={styles.title}>Welcome to Council!</Text>
            <Text style={styles.text}>
              Click the button below to verify your email address and get
              started.
            </Text>
            <Button href={url} style={styles.button}>
              Verify Email Address
            </Button>
            <Text style={styles.footer}>
              If you didn&apos;t request this email, you can safely ignore it.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#ffffff",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  container: {
    padding: "40px 20px",
    margin: "0 auto",
    maxWidth: "560px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center" as const,
    margin: "30px 0",
    color: "#000000",
  },
  text: {
    fontSize: "16px",
    lineHeight: "26px",
    textAlign: "center" as const,
    margin: "24px 0",
    color: "#000000",
  },
  button: {
    backgroundColor: "#000000",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
    margin: "28px 0",
  },
  footer: {
    fontSize: "14px",
    textAlign: "center" as const,
    margin: "24px 0",
    color: "#666666",
  },
};

export default MagicLinkEmail;
