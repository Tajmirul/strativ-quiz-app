import { useFormik, getIn } from 'formik';

export const getFormikProps = (
    formik: ReturnType<typeof useFormik<any>>,
    name: string,
) => {
    const error = formik.touched[name] && (formik.errors[name] as string);

    return {
        name,
        error: error || undefined,
        value: getIn(formik.values, name),
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
    };
};
