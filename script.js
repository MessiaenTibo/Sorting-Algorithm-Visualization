// Get the containers for each sorting algorithm's bars
const bubbleSortBars = document.getElementById('bubbleSortBars');
const insertionSortBars = document.getElementById('insertionSortBars');
const mergeSortBars = document.getElementById('mergeSortBars');
const quickSortBars = document.getElementById('quickSortBars');
const selectionSortBars = document.getElementById('selectionSortBars');

const delay = 40; // Delay in milliseconds for the sorting visualization
let RunningAlgorithms = []; // Array to store the running algorithms
const AmountOfBars = window.innerWidth < 500 ? 30 : 50; // try to display 50 bars but show only 30 on mobile

// Function to generate a random array
function generateRandomArray(size = AmountOfBars) {
  let array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 220) + 5);
  }
  return array;
}

// Function to display the array as bars in a specific container
function displayArray(array, container) {
  container.innerHTML = ''; // Clear the previous array
  array.forEach((height) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${height}px`;
    container.appendChild(bar);
  });
}

// Sleep function to add delay in the sorting visualization
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Bubble Sort Visualization
async function bubbleSort(array, container) {
  const bars = container.getElementsByClassName('bar');
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = 'red';
      bars[j + 1].style.backgroundColor = 'red';

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }

      await sleep(delay);
      bars[j].style.backgroundColor = 'rgb(92, 65, 124)';
      bars[j + 1].style.backgroundColor = 'rgb(92, 65, 124)';
    }
  }
}

// Insertion Sort Visualization
async function insertionSort(array, container) {
  const bars = container.getElementsByClassName('bar');
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      bars[j + 1].style.height = `${array[j]}px`;
      array[j + 1] = array[j];
      bars[j + 1].style.backgroundColor = 'red';
      await sleep(delay);
      bars[j + 1].style.backgroundColor = 'rgb(92, 65, 124)';
      j = j - 1;
    }

    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
  }
}

// Merge Sort Visualization
async function mergeSort(array, start, end, container) {
  if (start >= end) return;

  const middle = Math.floor((start + end) / 2);
  await mergeSort(array, start, middle, container);
  await mergeSort(array, middle + 1, end, container);

  await merge(array, start, middle, end, container);
}

async function merge(array, start, middle, end, container) {
  const bars = container.getElementsByClassName('bar');
  let leftArray = array.slice(start, middle + 1);
  let rightArray = array.slice(middle + 1, end + 1);

  let i = 0,
    j = 0,
    k = start;

  while (i < leftArray.length && j < rightArray.length) {
    bars[k].style.backgroundColor = 'red';
    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      bars[k].style.height = `${leftArray[i]}px`;
      i++;
    } else {
      array[k] = rightArray[j];
      bars[k].style.height = `${rightArray[j]}px`;
      j++;
    }
    await sleep(delay);
    bars[k].style.backgroundColor = 'rgb(92, 65, 124)';
    k++;
  }

  while (i < leftArray.length) {
    bars[k].style.height = `${leftArray[i]}px`;
    array[k] = leftArray[i];
    i++;
    k++;
  }

  while (j < rightArray.length) {
    bars[k].style.height = `${rightArray[j]}px`;
    array[k] = rightArray[j];
    j++;
    k++;
  }
}

// Quick Sort Visualization
async function quickSort(array, low, high, container) {
  if (low < high) {
    let pi = await partition(array, low, high, container);
    await quickSort(array, low, pi - 1, container);
    await quickSort(array, pi + 1, high, container);
  }
}

async function partition(array, low, high, container) {
  const bars = container.getElementsByClassName('bar');
  let pivot = array[high];
  let i = low - 1;

  bars[high].style.backgroundColor = 'red';
  for (let j = low; j < high; j++) {
    bars[j].style.backgroundColor = 'yellow';
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[j].style.height = `${array[j]}px`;
    }
    await sleep(delay);
    bars[j].style.backgroundColor = 'rgb(92, 65, 124)';
  }

  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  bars[high].style.height = `${array[high]}px`;
  bars[i + 1].style.height = `${array[i + 1]}px`;
  await sleep(delay);
  bars[high].style.backgroundColor = 'rgb(92, 65, 124)';
  return i + 1;
}

// Selection Sort Visualization
async function selectionSort(array, container) {
  const bars = container.getElementsByClassName('bar');
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    bars[minIndex].style.backgroundColor = 'red';

    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = 'yellow';

      if (array[j] < array[minIndex]) {
        bars[minIndex].style.backgroundColor = 'rgb(92, 65, 124)';
        minIndex = j;
        bars[minIndex].style.backgroundColor = 'red';
      }
      await sleep(delay);
      bars[j].style.backgroundColor = 'rgb(92, 65, 124)';
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[minIndex].style.height = `${array[minIndex]}px`;
    }

    bars[i].style.backgroundColor = 'rgb(92, 65, 124)';
  }
}

// Event listener for the 'Start Sorting' button
document.getElementById('startSortBtn').addEventListener('click', async () => {
  let array = generateRandomArray();

  // Clone the array for each algorithm
  let bubbleArray = [...array];
  let insertionArray = [...array];
  let mergeArray = [...array];
  let quickArray = [...array];
  let selectionArray = [...array];

  // Display the initial arrays
  displayArray(bubbleArray, bubbleSortBars);
  displayArray(insertionArray, insertionSortBars);
  displayArray(mergeArray, mergeSortBars);
  displayArray(quickArray, quickSortBars);
  displayArray(selectionArray, selectionSortBars);

  // Run the sorting algorithms simultaneously
  RunningAlgorithms = await Promise.all([
    bubbleSort(bubbleArray, bubbleSortBars),
    insertionSort(insertionArray, insertionSortBars),
    mergeSort(mergeArray, 0, mergeArray.length - 1, mergeSortBars),
    quickSort(quickArray, 0, quickArray.length - 1, quickSortBars),
    selectionSort(selectionArray, selectionSortBars),
  ]);
});

// Event listener for the 'Generate New Array' button
document.getElementById('generateArrayBtn').addEventListener('click', () => {
  // Stop the sorting algorithms if they are running
  RunningAlgorithms.forEach((algorithm) => {
    if (algorithm) {
      algorithm.cancel();
    }
  });

  // Generate a new random array
  const newArray = generateRandomArray();

  // Display the new arrays in each container
  displayArray(newArray, bubbleSortBars);
  displayArray(newArray, insertionSortBars);
  displayArray(newArray, mergeSortBars);
  displayArray(newArray, quickSortBars);
  displayArray(newArray, selectionSortBars);
});

// Generate an initial random array when the page loads
window.onload = () => {
  const randomArray = generateRandomArray();
  displayArray(randomArray, bubbleSortBars);
  displayArray(randomArray, insertionSortBars);
  displayArray(randomArray, mergeSortBars);
  displayArray(randomArray, quickSortBars);
  displayArray(randomArray, selectionSortBars);
};
