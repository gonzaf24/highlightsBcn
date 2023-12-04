import withEmpty from '../withEmpty/withEmpty';
import withError from '../withError/withError';
import withLoading from '../withLoading/withLoading';

const withRequest = (WrappedComponent, {
  useSkeleton = false,
  Loader = undefined,
  Skeleton = undefined,
  Empty = undefined,
  Error = undefined,
} = {
  useSkeleton: false,
  Loader: undefined,
  Skeleton: undefined,
  Empty: undefined,
  Error: undefined,
}) => {
  // Use the withLoading HOC to show a loading component while the wrapped component is loading

  // Use the withEmpty HOC to show an empty component while the wrapped component is empty
  const WrappedComponentWithEmpty = withEmpty(
    WrappedComponent,
    { Empty },
  );

  // Use the withError HOC to show an error component while the wrapped component has an error
  const WrappedComponentWithEmptyAndError = withError(
    WrappedComponentWithEmpty,
    { Error },
  );

  // Use the withLoading HOC to show a loading component while the wrapped component is loading
  const WrappedComponentWithLoadingErrorAndEmpty = withLoading(
    WrappedComponentWithEmptyAndError,
    {
      useSkeleton,
      Loader,
      Skeleton,
    },
  );

  return WrappedComponentWithLoadingErrorAndEmpty;
};

export default withRequest;
