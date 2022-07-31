import { Formik, Field, ErrorMessage, Form } from "formik"
import { object, string } from "yup"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { getShortLinkThunk } from "@/entities/links"
import { ImSpinner2 } from "react-icons/im"
import styles from "./styles.module.scss"

const formSchema = object({
  url: string()
    .url("Это поле принимает только ссылки!")
    .max(2048, "Ссылка не может быть длиннее 2048 символов!")
    .required("Это обязательное поле!"),
})

export const ShortenLink = () => {
  const dispatch = useAppDispatch()

  const { isLoading } = useAppSelector((state) => state.links.myLinks)

  return (
    <div className={styles.shortenUrl}>
      <h2 className={styles.shortenUrl__heading}>Введите ссылку</h2>
      <Formik
        initialValues={{ url: "" }}
        validationSchema={formSchema}
        onSubmit={(data, { resetForm }) => {
          dispatch(getShortLinkThunk(data.url))
          resetForm()
        }}
        validateOnBlur={true}
        validateOnChange={true}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          isValid,
          dirty,
          errors,
          touched,
        }) => {
          return (
            <>
              <Form onSubmit={handleSubmit} className={styles.shortenUrl__form}>
                <div className={styles.form__wrapper}>
                  <Field
                    type="text"
                    name="url"
                    id="url"
                    onChange={handleChange}
                    value={values.url}
                    className={styles.form__input}
                    required
                  />
                  {errors.url && touched.url && (
                    <ErrorMessage
                      name="url"
                      component="span"
                      className={styles.form__error}
                    />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!(dirty && isValid)}
                  className={styles.form__button}
                >
                  {isLoading && <ImSpinner2 className="spinner" />}
                  {!isLoading && <span>Сократить</span>}
                </button>
              </Form>
            </>
          )
        }}
      </Formik>
    </div>
  )
}
