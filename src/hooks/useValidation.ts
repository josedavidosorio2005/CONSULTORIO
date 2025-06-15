import { useState, useCallback } from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  phone?: boolean;
  custom?: (value: string) => string | null;
}

export interface FieldConfig {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string | undefined;
}

export const useValidation = <T extends Record<string, string>>(
  initialData: T,
  validationConfig: FieldConfig
) => {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback((name: string, value: string): string | null => {
    const rules = validationConfig[name];
    if (!rules) return null;

    // Required validation
    if (rules.required && (!value || value.trim() === '')) {
      return 'Este campo es obligatorio';
    }

    // Skip other validations if field is empty and not required
    if (!value || value.trim() === '') return null;

    // Min length validation
    if (rules.minLength && value.length < rules.minLength) {
      return `Debe tener al menos ${rules.minLength} caracteres`;
    }

    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength) {
      return `No puede tener más de ${rules.maxLength} caracteres`;
    }

    // Email validation
    if (rules.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Ingrese un email válido';
      }
    }

    // Phone validation
    if (rules.phone) {
      const phoneRegex = /^[+]?[0-9\s\-\(\)]{9,}$/;
      if (!phoneRegex.test(value)) {
        return 'Ingrese un teléfono válido';
      }
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      return 'El formato no es válido';
    }

    // Custom validation
    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  }, [validationConfig]);

  const validateAll = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(validationConfig).forEach(field => {
      const error = validateField(field, data[field] || '');
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(validationConfig).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>));

    return isValid;
  }, [data, validationConfig, validateField]);

  const updateField = useCallback((name: keyof T, value: string) => {
    setData(prev => ({ ...prev, [name]: value }));
    
    // Validate field if it has been touched
    if (touched[name as string]) {
      const error = validateField(name as string, value);
      setErrors(prev => ({
        ...prev,
        [name]: error || undefined
      }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name as string, data[name] || '');
    setErrors(prev => ({
      ...prev,
      [name]: error || undefined
    }));
  }, [data, validateField]);

  const resetForm = useCallback(() => {
    setData(initialData);
    setErrors({});
    setTouched({});
  }, [initialData]);

  const isFieldInvalid = useCallback((name: keyof T) => {
    return touched[name as string] && !!errors[name as string];
  }, [touched, errors]);

  return {
    data,
    errors,
    touched,
    updateField,
    handleBlur,
    validateAll,
    resetForm,
    isFieldInvalid,
    isValid: Object.keys(errors).length === 0
  };
};
