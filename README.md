# Live webcam classifier

### Live action classifier that captures classes of objects, movements, or expressions.

![classifier-demo](https://user-images.githubusercontent.com/43356500/65803649-2d48fc00-e14d-11e9-9e15-250da678e00e.gif)

Try it yourself: https://richieyoum.github.io/Live-webcam-classifier/

## Getting started
Access the url using Chrome or Firefox. Depending on your browser's privacy setting, you may have to manually allow for webcam access.

```
Add new classes by pressing buttons A, B, C, or D
```
Each click on the button captures a frame of the video for that class, and uses it as the model's training data. The 'Prediction' shows the prediction of the webcam video in live action, with its probability listed just below.

For optimal results, try adding at least 15~20 captures in different angles per class

## About the model
This classifier uses transfer learning on mobilenet, a lightweight solution for mobile and embedded vision applications. For more details on MobileNet, check <a href="https://arxiv.org/abs/1704.04861">here</a> This application is built using tensorflow.js.

<p align="center">
  <img src="https://user-images.githubusercontent.com/43356500/65804734-ec52e680-e150-11e9-960b-a84fa30be85a.png" width='500'>
</p>

## Author
- Richie Youm

## Credits
Check out tensorflow.js examples & tutorials on https://www.tensorflow.org/js/models/
