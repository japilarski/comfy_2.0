import { useNavigation } from 'react-router-dom';

type SubmitBtnInput = {
  text: string;
};

export const SubmitBtn = (props: SubmitBtnInput) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"> sending...</span>
        </>
      ) : (
        props.text
      )}
    </button>
  );
};
