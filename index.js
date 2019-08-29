let net;
const webcamElement = document.getElementById('webcam');
const classifier = knnClassifier.create();

$('.image-section').hide();
$('.loader').hide();
$('#result').hide();

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.imagePreview').css('background-image', 'url(' + e.target.result + ')');
            $('.imagePreview').hide();
            $('.imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#imageUpload").change(function () {
    $('.image-section').show();
    $('#btn-predict').show();
    $('#result').text('');
    $('#result').hide();
    readURL(this);
});

$('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        console.log('Loading mobilenet...')
        net = mobilenet.load()
        console.log('Successfully loaded model')
        const imgEl = document.getElementById('img');
        const result = net.classify(imgEl);
        console.log(result);

        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!');
            },
        });
    });


    // async function app() {
    //   console.log('Loading mobilenet..');
    //
    //   // Load the model.
    //   net = await mobilenet.load();
    //   console.log('Sucessfully loaded model');
    //
    //   // Make a prediction through the model on our image.
    //   const imgEl = document.getElementById('img');
    //   const result = await net.classify(imgEl);
    //   console.log(result);
    // }
    //
    // app();


// async function setupWebcam() {
//   return new Promise((resolve, reject) => {
//     const navigatorAny = navigator;
//     navigator.getUserMedia = navigator.getUserMedia ||
//         navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
//         navigatorAny.msGetUserMedia;
//     if (navigator.getUserMedia) {
//       navigator.getUserMedia({video: true},
//         stream => {
//           webcamElement.srcObject = stream;
//           webcamElement.addEventListener('loadeddata',  () => resolve(), false);
//         },
//         error => reject());
//     } else {
//       reject();
//     }
//   });
// }

// async function app() {
//   console.log('Loading mobilenet..');
//
//   // Load the model.
//   net = await mobilenet.load();
//   console.log('Sucessfully loaded model');
//
//   await setupWebcam();
//
//   // Reads an image from the webcam and associates it with a specific class
//   // index.
//   const addExample = classId => {
//     // Get the intermediate activation of MobileNet 'conv_preds' and pass that
//     // to the KNN classifier.
//     const activation = net.infer(webcamElement, 'conv_preds');
//
//     // Pass the intermediate activation to the classifier.
//     classifier.addExample(activation, classId);
//   };
//
//   // When clicking a button, add an example for that class.
//   document.getElementById('class-a').addEventListener('click', () => addExample(0));
//   document.getElementById('class-b').addEventListener('click', () => addExample(1));
//   document.getElementById('class-c').addEventListener('click', () => addExample(2));
//   document.getElementById('class-d').addEventListener('click', () => addExample(3));
//
//   while (true) {
//     if (classifier.getNumClasses() > 0) {
//       // Get the activation from mobilenet from the webcam.
//       const activation = net.infer(webcamElement, 'conv_preds');
//       // Get the most likely class and confidences from the classifier module.
//       const result = await classifier.predictClass(activation);
//
//       const classes = ['A', 'B', 'C', 'D'];
//       document.getElementById('console').innerText = `
//         prediction: ${classes[result.classIndex]}\n
//         probability: ${result.confidences[result.classIndex]}
//       `;
//     }
//
//     await tf.nextFrame();
//   }
// }
// };
//app();
