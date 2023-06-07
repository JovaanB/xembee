import { HTMLChakraProps, ThemingProps, chakra } from '@chakra-ui/react';

export const Wind = ({
  ...rest
}: HTMLChakraProps<'svg'> & { colorScheme?: ThemingProps['colorScheme'] }) => {
  return (
    <chakra.svg
      fill="#000000"
      height="40px"
      width="40px"
      version="1.1"
      viewBox="0 0 512.495 512.495"
      {...rest}
    >
      <g>
        <g>
          <g>
            <path
              d="M97.41,74.743c1.92,0,3.866-0.649,5.461-1.98c16.956-14.165,35.78-25.916,55.962-34.935
				c4.301-1.929,6.229-6.972,4.309-11.273s-6.955-6.238-11.273-4.309c-21.623,9.66-41.788,22.246-59.938,37.419
				c-3.627,3.021-4.096,8.397-1.084,12.015C92.537,73.702,94.969,74.743,97.41,74.743z"
            />
            <path
              d="M56.373,124.006c2.586-3.934,1.493-9.225-2.449-11.819c-3.925-2.577-9.216-1.485-11.819,2.449
				c-10.786,16.427-20.011,35.456-27.409,56.55c-1.553,4.446,0.785,9.318,5.231,10.88c0.93,0.324,1.886,0.486,2.825,0.486
				c3.524,0,6.818-2.202,8.047-5.717C37.745,157.047,46.338,139.273,56.373,124.006z"
            />
            <path
              d="M21.745,210.167c0.905-4.625-2.108-9.114-6.741-10.01c-4.693-0.939-9.105,2.108-10.01,6.733
				c-7.185,36.702-6.195,75.187,2.859,111.283c0.964,3.874,4.446,6.451,8.26,6.451c0.691,0,1.382-0.077,2.082-0.247
				c4.582-1.152,7.356-5.786,6.204-10.359C15.959,280.337,15.038,244.429,21.745,210.167z"
            />
            <path
              d="M52.226,273.852c0.384,4.446,4.113,7.791,8.491,7.791c0.247,0,0.495-0.009,0.751-0.034
				c4.702-0.401,8.166-4.548,7.757-9.242c-2.859-32.742,2.901-65.715,16.674-95.343c1.98-4.275,0.128-9.353-4.139-11.332
				c-4.301-1.997-9.353-0.128-11.341,4.139C55.392,202.163,49.103,238.131,52.226,273.852z"
            />
            <path
              d="M321.922,26.206c33.382,9.532,64.947,26.692,91.264,49.63c1.613,1.408,3.618,2.099,5.606,2.099
				c2.372,0,4.745-0.998,6.434-2.927c3.098-3.558,2.722-8.943-0.828-12.041c-28.203-24.576-62.02-42.957-97.792-53.171
				c-4.497-1.289-9.25,1.323-10.547,5.862C314.763,20.198,317.391,24.917,321.922,26.206z"
            />
            <path
              d="M342.812,70.391c-4.267-1.988-9.344-0.137-11.349,4.13c-1.988,4.267-0.137,9.353,4.13,11.341
				c29.781,13.892,55.45,35.362,74.231,62.106c1.655,2.364,4.309,3.627,6.989,3.627c1.698,0,3.413-0.503,4.907-1.553
				c3.849-2.705,4.779-8.03,2.074-11.887C403.287,108.979,375.289,85.547,342.812,70.391z"
            />
            <path
              d="M428.503,316.041c-24.55-14.191-93.03-44.467-121.225-56.781c0.068-1.084,0.171-2.159,0.171-3.26
				c0-28.228-22.972-51.2-51.209-51.2c-1.98,0-3.934,0.145-5.871,0.367c-7.228-64.546-11.196-109.961-11.196-128.367
				c0-59.733,12.399-59.733,17.067-59.733c4.668,0,17.075,0,17.075,59.733c0,20.523-2.782,56.149-8.269,105.916
				c-0.512,4.685,2.867,8.9,7.552,9.421c4.71,0.486,8.892-2.876,9.412-7.552c5.555-50.381,8.371-86.639,8.371-107.785
				c0-39.885-4.13-76.8-34.142-76.8c-30.003,0-34.133,36.915-34.133,76.8c0,24.431,6.161,84.591,11.648,133.274
				c-16.973,8.346-28.715,25.771-28.715,45.926c0,11.298,3.721,21.709,9.933,30.182c-30.993,22.903-84.079,61.892-105.395,74.197
				c-51.703,29.858-57.933,19.132-60.254,15.087c-2.338-4.036-8.533-14.78,43.187-44.646c17.562-10.146,50.714-25.976,95.863-45.807
				c4.318-1.894,6.272-6.929,4.386-11.238c-1.903-4.309-6.921-6.281-11.255-4.386c-46.353,20.361-79.172,36.053-97.527,46.652
				C49.444,335.983,19.552,358.025,34.545,384c5.726,9.924,14.225,13.884,24.474,13.884c16.58,0,37.743-10.394,59.093-22.724
				c22.647-13.065,78.379-54.093,109.244-76.911c8.235,5.641,18.176,8.951,28.885,8.951c21.086,0,39.228-12.817,47.07-31.061
				c45.38,19.866,97.493,43.605,116.668,54.682c51.721,29.867,45.517,40.61,43.187,44.646c-2.321,4.045-8.567,14.763-60.271-15.087
				c-17.604-10.155-47.88-30.942-87.578-60.109c-3.797-2.807-9.139-1.971-11.93,1.818c-2.79,3.806-1.971,9.148,1.826,11.93
				c40.764,29.961,70.758,50.526,89.148,61.141c21.35,12.331,42.522,22.724,59.11,22.724c10.24,0,18.756-3.968,24.482-13.884
				C492.939,358.025,463.046,335.983,428.503,316.041z M256.241,290.133c-18.825,0-34.133-15.309-34.133-34.133
				c0-18.816,15.309-34.133,34.133-34.133c18.825,0,34.142,15.317,34.142,34.133C290.383,274.825,275.065,290.133,256.241,290.133z"
            />
            <path
              d="M508.435,211.866c-0.819-4.642-5.18-7.748-9.882-6.946c-4.634,0.811-7.748,5.231-6.938,9.873
				c3.789,21.743,4.565,43.921,2.287,65.929c-0.486,4.693,2.918,8.883,7.612,9.37c0.29,0.034,0.589,0.043,0.887,0.043
				c4.318,0,8.021-3.26,8.482-7.654C513.316,258.91,512.488,235.153,508.435,211.866z"
            />
            <path
              d="M422.411,427.776c-24.934,24.141-55.578,42.897-88.61,54.221c-4.463,1.527-6.835,6.383-5.308,10.837
				c1.212,3.541,4.531,5.777,8.073,5.777c0.913,0,1.852-0.154,2.765-0.469c35.396-12.134,68.224-32.23,94.942-58.112
				c3.396-3.277,3.473-8.678,0.205-12.066C431.191,424.576,425.773,424.499,422.411,427.776z"
            />
            <path
              d="M450.46,89.216c-3.072-3.567-8.448-3.968-12.032-0.905c-3.567,3.072-3.977,8.465-0.905,12.032
				c13.696,15.932,24.781,32.265,32.956,48.555c1.493,2.987,4.514,4.702,7.637,4.702c1.28,0,2.594-0.29,3.814-0.905
				c4.215-2.116,5.922-7.236,3.806-11.452C476.939,123.708,465.069,106.206,450.46,89.216z"
            />
            <path
              d="M273.76,460.049c0.247,0,0.503-0.009,0.759-0.034c35.499-3.14,69.803-15.676,99.2-36.241
				c3.857-2.705,4.796-8.03,2.099-11.887c-2.705-3.866-8.021-4.796-11.887-2.099c-26.948,18.859-58.394,30.353-90.914,33.229
				c-4.702,0.418-8.166,4.557-7.748,9.25C265.662,456.704,269.382,460.049,273.76,460.049z"
            />
            <path
              d="M174.236,480.444c-20.736-7.595-40.329-18.022-58.232-30.993c-3.831-2.773-9.165-1.911-11.912,1.903
				c-2.765,3.814-1.92,9.156,1.903,11.921c19.183,13.892,40.166,25.062,62.37,33.195c0.964,0.35,1.963,0.521,2.935,0.521
				c3.473,0,6.75-2.142,8.013-5.606C180.934,486.963,178.656,482.065,174.236,480.444z"
            />
            <path
              d="M300.401,490.82c-20.617,3.891-40.329,5.316-58.539,4.267c-4.668-0.282-8.738,3.328-9.003,8.03
				c-0.273,4.71,3.311,8.738,8.021,9.011c4.181,0.247,8.431,0.367,12.749,0.367c15.906,0,32.649-1.638,49.937-4.907
				c4.634-0.87,7.672-5.333,6.801-9.967C309.489,492.996,305.035,489.95,300.401,490.82z"
            />
          </g>
        </g>
      </g>
    </chakra.svg>
  );
};
