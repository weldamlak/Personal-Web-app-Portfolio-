import { useState, type FormEvent } from "react";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const EMPTY_FORM: ContactFormData = { name: "", email: "", message: "" };

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "9c58710a-10a9-429a-9c13-6cbf99ca566f",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
        setFormData(EMPTY_FORM);
        setTimeout(() => setFormSubmitted(false), 5000);
      } else {
        alert("Something went wrong while sending the message. Please try again.");
      }
    } catch (error) {
      console.error("Form error:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, setFormData, formSubmitted, isSubmitting, handleFormSubmit };
}